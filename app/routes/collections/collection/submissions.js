import Ember from 'ember';


export default Ember.Route.extend({

    caxe: Ember.inject.service(),

    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    title: "Submissions",

    model() {
        const collection = this.modelFor('collections.collection');
        return Ember.RSVP.hash({
            cases: this.store.query("case", {
                collection: collection.id
            }),
            collection: collection
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
                route: "collections.collection.edit",
                type: "routeWithModel",
                model: model.collection
            },
            {
                label: "Submissions",
                route: "collections.collection.submissions",
                type: "routeWithModel",
                model: model.collection
            }
        ]);

    },

    setupController(controller, data) {
        controller.set("model", data.collection);
        controller.set("hasDynamicPart", true);
        controller.set("title", this.get("title"));
        controller.set("collection", data.collection);
        controller.set("cases", data.cases);
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
