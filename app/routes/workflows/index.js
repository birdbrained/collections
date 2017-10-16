import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),

    title: "Browse",

    model(params) {
        return Ember.RSVP.hash({
            "workflows": this.modelFor('workflows')
        });
    },

    afterModel(model, transition) {
    },

    setupController(controller, data) {
        controller.set("title", this.get("title"));
        controller.set("workflows", data.workflows);
        this.set("path.parts", this.routeName.split(".").map((cur, i, arr) => {
            let routeName = arr.slice(0, i+1).join(".");
            let controller = this.controllerFor(routeName);
            return {
                label: controller.get("title"),
                route: routeName,
                routePart: cur
            };
        }));
    },

});
