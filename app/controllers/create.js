import Ember from 'ember';

export default Ember.Controller.extend({
    title: '',
    selectedType: 'Preprint',
    description: '',

    typeList: Ember.A(['Project', 'Registration', 'Preprint', 'Website', 'Meeting']),

    actions: {
        addCollection () {
            const collection = this.store.createRecord('collection', {
                title: this.get('title'),
                tags: '',
                settings: JSON.stringify({ collectionType: this.get('selectedType') }),
                description: this.get('description'),
            });
            collection.save().then((record) => {
                this.set('newCollectionTitle', '');
                this.transitionToRoute('collection', record);
            },
            );
        },
        updateType (value) {
            this.set('selectedType', value);
        },
    },
});
