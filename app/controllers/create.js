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
            value: "meeting",
            description: "A meeting is a collection of talks and posters. Each talk or poster should have title and description."
        }, {
            label: 'Dataset',
            value: "dataset",
            description: "A dataset is a collection of items with the same data fields attached to each ofthem."
        }, {
            label: 'Appendix',
            value: "appendix",
            description: "An appendix is a collection of additional materials that relate to apublished article."
        }, {
            label: 'Preprints',
            value: "preprints",
            description: "A collection of articles that{ may be considered for publishin but have not yet been published."
        }, {
            label: 'Registrations',
            value: "registrations",
            descriptions: "A collection of snapshots of the state of a project at a certain point in its lifecycle, registered publicly."
        }, {
            label: 'Bookmarks',
            value: "bookmarks",
            description: "A collection of related URLs."
        }, {
            label: 'Proposals',
            value: "proposals",
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
                collectionType: this.get('chosen'),
                description: this.get('description'),
                location: this.get('location'),
                address: this.get('address')
            });
            collection.set('workflow', this.get('selectedWorkflow'));
            collection.save().then((record) => {
                this.set('newCollectionTitle', '');
                this.transitionToRoute('collection', record);
            });
        },
        setWorkflow(ev) {
            let workflows = this.get('workflows');
            this.set('selectedWorkflow', workflows.find(wf => wf.id === ev.target.value));
        }
    },
});
