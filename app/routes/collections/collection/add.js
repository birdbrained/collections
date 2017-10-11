import Ember from 'ember';


export default Ember.Route.extend({

    //panelActions: Ember.inject.service('panelActions'),
    caxe: Ember.inject.service(),

    model() {
        const caxe = this.get('caxe.activeCase');
        return Ember.RSVP.hash({
            caxe: this.get('store').findRecord('case', caxe.get('id'), {
                reload: true
            }),
            collection: this.modelFor('collections.collection')
        });
    },

    setupController(controller, model) {
        controller.set('caxe', model.caxe);
        controller.set('collection', model.collection);
    },

});
