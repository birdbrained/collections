import Ember from 'ember';

export default Ember.Controller.extend({
    title: '',
    selectedType: 'Preprint',
    selectedWorkflow: undefined,
    description: '',
    workflows: undefined,
    // preprints, websites/links, etc. will be added later to the following list:
    typeList: [
        {
            label: 'Meeting',
            description: "A meeting is a collection of talks and posters. Each talk or poster should have title and description."
        }, {
            label: 'Dataset',
            description: "A dataset is a collection of items with the same data fields attached to each ofthem."
        }, {
            label: 'Appendix',
            description: "An appendix is a collection of additional materials that relate to apublished article."
        }, {
            label: 'Preprints',
            description: "A collection of articles that{ may be considered for publishin but have not yet been published."
        }, {
            label: 'Registrations',
            descriptions: "A collection of snapshots of the state of a project at a certain point in its lifecycle, registered publicly."
        }, {
            label: 'Bookmarks',
            description: "A collection of related URLs."
        }, {
            label: 'Proposals',
            description: "A collection of ideas to be pursued."
        }
    ],

    actions: {
        addCollection () {
            const collection = this.store.createRecord('collection', {
                title: this.get('title'),
                location: this.get('location'),
                address: this.get('address'),
                tags: '',
                settings: {},
                collectionType: this.get('selectedType'),
                description: this.get('description'),
            });
            collection.set('workflow', this.get('selectedWorkflow'));
            collection.save().then((record) => {
                this.set('newCollectionTitle', '');
                this.transitionToRoute('collection', record);
            });
        },
        updateType (value) {
            this.set('selectedType', value);
        },
        setWorkflow(ev) {
            let workflows = this.get('workflows');
            this.set('selectedWorkflow', workflows.find(wf => wf.id === ev.target.value));
        }
    },
});
