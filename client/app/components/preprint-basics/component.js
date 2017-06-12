import Ember from 'ember';
import fixSpecialChar from 'ember-osf/utils/fix-special-char';
import { validator, buildValidations } from 'ember-cp-validations';
import ENV from '../../config/environment';

// Form data and validations
const BASICS_VALIDATIONS = buildValidations({
    basicsAbstract: {
        description: 'Abstract',
        validators: [
            validator('presence', true),
            validator('length', {
                // currently min of 20 characters -- this is what arXiv has as the minimum length of an abstract
                min: 20,
                max: 5000
            })
        ]
    },
    basicsDOI: {
        description: 'DOI',
        validators: [
            validator('format', {
                // Simplest regex- try not to diverge too much from the backend
                regex: /\b(10\.\d{4,}(?:\.\d+)*\/\S+(?:(?!["&\'<>])\S))\b/,
                allowBlank: true,
                message: 'Please use a valid {description}'
            })
        ]
    }
});

const DOI_REGEX = /\b(10\.\d{4,}(?:\.\d+)*\/\S+(?:(?!["&\'<>])\S))\b/;

function doiRegexExec(doi) {
    //Strips url out of inputted doi, if any.  For example, user input this DOI: https://dx.doi.org/10.12345/hello. Returns 10.12345/hello.
    // If doi invalid, returns doi.
    if (doi) {
        const doiOnly = DOI_REGEX.exec(doi);
        return doiOnly !== null ? doiOnly[0] : doi;
    }
    return doi;

}

/* Does not support editing */
export default Ember.Component.extend(BASICS_VALIDATIONS, {
    store: Ember.inject.service(),
    editMode: true,
    applyLicense: false,

    /* Validation */
    uploadValid: Ember.computed.alias('nodeLocked'), // Once the node has been locked (happens in step one of upload section), users are free to navigate through form unrestricted
    abstractValid: Ember.computed.alias('validations.attrs.basicsAbstract.isValid'),
    doiValid: Ember.computed.alias('validations.attrs.basicsDOI.isValid'),
    licenseValid: false,     // Must have year and copyrightHolders filled if those are required by the licenseType selected
    basicsValid: Ember.computed.and('abstractValid', 'doiValid', 'licenseValid'),

    /* Initial values */
    basicsAbstract:  Ember.computed('node.description', function() {
        let node = this.get('node');
        return node ? node.get('description') : null;
    }),
    basicsTags: Ember.computed('node', function() {
        const node = this.get('node');
        return node ? node.get('tags').map(fixSpecialChar) : Ember.A();
    }),
    basicsDOI: null,
    basicsLicense: null,

    /* Check if discard is needed */
    savedValues: Ember.computed('node', function() {
        let node = this.get('node');
        let values = {
            basicsDOI: null,
            basicsLicense: null,
            basicsTags: node.get('tags').map(fixSpecialChar),
            basicsAbstract: node.get('description')
        }
        return values ;
    }),
    basicsChanged:  Ember.computed('basicsDOI', 'basicsLicense', 'basicsTags.@each', 'basicsAbstract', 'applyLicense', function() {
        let saved = this.get('savedValues');
        let doiChanged = saved.basicsDOI !== this.get('basicsDOI');
        let licenseChanged = saved.basicsLicense !== this.get('basicsLicense') && this.get('applyLicense');
        let abstractChanged = saved.basicsAbstract ? saved.basicsAbstract !== this.get('basicsAbstract') : false ;
        let tagsChanged = saved.basicsTags ? saved.basicsTags.length !== this.get('basicsTags').length || saved.basicsTags.some((v,i) => v !== this.get('basicsTags')[i])  : false ;

      return doiChanged || licenseChanged || abstractChanged || tagsChanged;
    }),



    actions: {
        addTag(tag) {
            this.get('basicsTags').pushObject(tag);
        },
        removeTag(tag) {
            this.get('basicsTags').removeObject(tag);
        },
        applyLicenseToggle(apply) {
            this.set('applyLicense', apply);
        },
        discardBasics() {
            // Discard changes since load or last save
            let saved = this.get('savedValues');

            this.set('basicsTags', saved.basicsTags.map(function(a){return a;}) );
            this.set('basicsAbstract', saved.basicsAbstract);
            this.set('basicsDOI', saved.basicsDOI);
            this.set('basicsLicense', saved.basicsLicense);
            this.set('applyLicense', false);
        },
        preventDefault(e) {
            e.preventDefault();
        },
        stripDOI() {
            // Replaces the inputted doi link with just the doi itself
            let basicsDOI = this.get('basicsDOI');
            this.set('basicsDOI', doiRegexExec(basicsDOI));
        },
        editLicense(basicsLicense, licenseValid) {
           this.setProperties({
               basicsLicense,
               licenseValid
           });
           this.set('initialLicenseChangeMade', true);
       },
       saveBasics() {
            // Saves the description/tags on the node and the DOI on the preprint, then advances to next panel
            if (!this.get('basicsValid')) {
                return;
            }

            // Save locally
            let values = {
                basicsDOI:  this.get('basicsDOI'),
                basicLicense: this.get('basicsLicense'),
                basicsTags: this.get('basicsTags').slice(),
                basicsAbstract: this.get('basicsAbstract')
            };
            this.set('savedValues', values);

            this.get('action')(this).then((result) => {
                this.attrs.saveParameter(this.attrs.widget.value.parameters.basicInfo ,{
                    value: this.get('basicsAbstract'),
                    state: ['defined']
                });
                this.set('editMode', false);
                this.attrs.closeSection(this.get('name'));
            });

            // Save at the end
            // Promise.all([
            //     node.save(),
            //     model.save()
            // ])
            //     .then(() => this.send('next', this.get('_names.2')))
            //     // If save fails, do not transition
            //     .catch(() => {
            //         this.get('toast').error(
            //             this.get('i18n').t('submit.basics_error')
            //         );
            //
            //         model.setProperties({
            //             licenseRecord: currentLicenseRecord,
            //             license: currentLicenseType,
            //             doi: currentDOI,
            //         });
            //
            //         node.setProperties({
            //             description: currentAbstract,
            //             tags: currentTags,
            //             license: currentNodeLicenseType,
            //             nodeLicense: currentNodeLicenseRecord,
            //         });
            //
            //         return Promise.all([
            //             node.save(),
            //             model.save()
            //         ]);
            //     });
        },
    },
    init(){
        this._super(...arguments);
        this.get('store').findRecord('node', ENV.NODE_GUID).then((result)=>{
            this.set('node', result);
        });
    }
});
