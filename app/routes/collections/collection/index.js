import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    title: "Home",

    model(params) {
        return this.modelFor("collections.collection");
    },

    afterModel(model, transition) {

        this.set("navLinks.links", [
            {
                label: "",
                route: "explore"
            },
            {
                label: "Settings",
                route: "collections.collection.edit",
                type: "routeWithModel",
                model: model
            },
            {
                label: "Submissions",
                route: "collections.collection.submissions",
                type: "routeWithModel",
                model: model
            }
        ]);

    },

    setupController(controller, data) {
        controller.set("model", data);
        controller.set("hasDynamicPart", true);
        controller.set("title", this.get("title"));
        controller.set("collection", data);
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
