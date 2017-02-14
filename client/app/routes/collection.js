import Ember from 'ember';

let formatData = function (collection){
    //Format dates
    let dateCreated = new Date(collection.get('dateCreated'));
    collection.set('dateCreatedReadable', dateCreated.toDateString());
    let dateUpdated = new Date(collection.get('dateUpdated'));
    collection.set('dateUpdatedReadable', dateUpdated.toDateString());

    return collection;
};

export default Ember.Route.extend({
  model (params) {
    return this.store.findRecord('collection', params.collection_id).then(function(data){
      return formatData(data);
    });
  }
});
