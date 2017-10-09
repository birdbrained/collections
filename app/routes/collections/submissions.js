import Ember from 'ember';


export default Ember.Route.extend({

    panelActions: Ember.inject.service('panelActions'),
    caxe: Ember.inject.service(),

    model() {
        const collection = this.modelFor('collection');
        return Ember.RSVP.hash({
            cases: this.store.query("case", {
                collection: collection.id
            }),
            collection: collection
        });
    },

    setupController(controller, model) {
        controller.set('collection', model.collection);
        controller.set('cases', model.cases);
    },

});
