import Ember from 'ember';

const WORKFLOW_NAME = 'preprint-submission';

export default Ember.Route.extend({
    panelActions: Ember.inject.service('panelActions'),
    model() {
        return this.store.findRecord('workflow', WORKFLOW_NAME);
    },

    setupController(controller, model) {
        debugger;
        // Set up state defined on the model.
        controller.set('sections', model.get('sections'));
        controller.set('parameters', model.get('initialParameters'));

        // Hydrate actions in preperation for engine ignition
        const actions = model.get('actions').map(controller.hydrateAction.bind(controller));
        controller.set('formActions', actions);

        // Start the engine.
        controller.updateState.call(controller, actions);

    }

});
