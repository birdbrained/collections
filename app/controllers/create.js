import Ember from 'ember';

export default Ember.Controller.extend({
    typeList : Ember.A(['Project', 'Registration', 'Preprint', 'Website', 'Meeting']),
    title: '',
    selectedType: 'Preprint',
    description: '',
    actions : {
        addCollection () {
            let collection = this.store.createRecord('collection', {
                title: this.get('title'),
                tags: '',
                settings: JSON.stringify({ collectionType : this.get('selectedType')}),
                description: this.get('description')
            });
            collection.save().then(record => {
                this.set('newCollectionTitle', '');
                this.transitionToRoute('collection', record);
            }
            );
        },
        updateType (value){
            this.set('selectedType', value);
        }
    }
});
