import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    model(params) {
        let wf = this.store.findRecord("workflow", params.workflow_id)
        return Ember.RSVP.hash({
            "workflow": wf,
            "stubs": wf.then(wf => wf.get("parameterStubs")),
            "sections": wf.then(wf => wf.get("sections")),
            "widgets": wf.then(wf => wf.get("widgets"))
        });
    },

    afterModel(model, transition) {

        this.set("navLinks.links", [
            {
                label: "",
                route: "explore"
            },
            {
                label: "Settings",
                route: "workflows.workflow",
                type: "routeWithModel",
                model: model.workflow
            },
            {
                label: "Submissions",
                route: "workflows.workflow",
                type: "routeWithModel",
                model: model.workflow
            }
        ]);

    },

    setupController(controller, data) {
        controller.set("model", data.workflow);
        controller.set("hasDynamicPart", true);
        controller.set("title", data.workflow.get("title"));
        controller.set("workflow", data.workflow);
        controller.set("stubs", data.stubs);
        this.set("path.parts", this.routeName.split(".").map((cur, i, arr) => {
            let routeName = arr.slice(0, i+1).join(".");
            let controller = this.controllerFor(routeName);
            return {
                label: controller.get("title"),
                route: routeName,
                model: controller.get("model"),
                type: controller.get("hasDynamicPart") ? "routeWithModel" : "",
                routePart: cur
            };
        }));
    },

});
