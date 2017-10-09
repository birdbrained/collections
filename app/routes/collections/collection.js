import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),

    model(params) {
        return Ember.RSVP.hash({
            "collection": this.store.findRecord("collection", params.collection_id)
        });
    },

    afterModel(model, transition) {
        if (transition.targetName === this.routeName) {
            this.set("path.parts", transition.targetName.split(".").map((cur, i, arr) => {
                let routeName = arr.slice(0, i+1).join(".");
                let model = this.modelFor(routeName);
                return {
                    label: model.title,
                    route: routeName,
                    routePart: cur
                };
            }));
        }
    },

    setupController(controller, data) {
        controller.set("title", data.title);
        controller.set("collection", data.collection);
    },

});
