import Ember from 'ember';

export default Ember.Route.extend({
    model (params) {
        return Ember.RSVP.hash({
            item: this.store.findRecord('item', params.item_id),
            collection: this.modelFor("collections.collection")
        });
    },

    setupController(controller, data) {
        controller.set('item', data.item);
        controller.set('collection', data.collection);
    }
});
