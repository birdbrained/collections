import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),

    title: "Collections",

    model(params) {
        return Ember.RSVP.hash({
            "title": this.get("title"),
            "collections": this.store.findAll('collection')
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
        controller.set("collection", data.collections);
    }

});
