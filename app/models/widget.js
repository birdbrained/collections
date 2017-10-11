import Ember from 'ember';
import DS from 'ember-data';


const {
    computed,
} = Ember;

const {
    Model,
    attr,
    belongsTo,
    hasMany
} = DS;


export default Model.extend({

    caxe: Ember.inject.service(),

    label: attr('string'),
    description: attr('string'),
    widgetType: attr('string'),
    defaultValue: attr('string'),
    index: attr('number'),
    parameterAliases: hasMany('parameter-alias', {
        inverse: 'widget',
        async: false
    }),

    workflow: belongsTo('workflow', {
        inverse: 'widgets'
    }),

    section: belongsTo('section', {
        inverse: 'widgets'
    }),

    elId: Ember.computed(function() {
        return this.get("widgetType") + this.get("id");
    }),

    caseParameters: Ember.computed('caxe.activeCase.parameters.@each', function() {
        let activeCase = this.get('caxe.activeCase');
        if (activeCase) {
            let aliases = this.get('parameterAliases');
            let caseParams = aliases.reduce((case_parameters, alias) => {
                let key = alias.get('alias')
                let value = activeCase.get('parameters').find(p => p.get('stub.id') === alias.get('parameterStub.id'))
                return Object.assign({ [key]: value }, case_parameters)
            }, {});
            return caseParams;
        }
        return {};
    })

});
