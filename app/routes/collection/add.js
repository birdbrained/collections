import Ember from 'ember';


export default Ember.Route.extend({
    panelActions: Ember.inject.service('panelActions'),
    model() {
        const collectionSettings = this.modelFor('collection').get('settings');
        const collectionType = JSON.parse(collectionSettings).collectionType;
        return this.store.findRecord('workflow', collectionType);
    },

    setupController(controller, model) {
        controller.set('workflow', model);
    },

});
