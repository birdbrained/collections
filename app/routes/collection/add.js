import Ember from 'ember';


export default Ember.Route.extend({
    panelActions: Ember.inject.service('panelActions'),
    model() {
        const collectionSettings = this.modelFor('collection').get('settings');
        const collectionType = JSON.parse(collectionSettings).collectionType;
        return this.store.findRecord('workflow', collectionType);
    },

    setupController(controller, model) {
        // Set up state defined on the model.
        controller.set('sections', model.get('sections'));
        controller.set('parameters', model.get('initialParameters'));

        // Hydrate actions in preperation for engine ignition
        const actions = model.get('actions').map(controller.hydrateAction.bind(controller));
        controller.set('formActions', actions);

        // Start the engine.
        controller.updateState.call(controller, actions);
    },

});
