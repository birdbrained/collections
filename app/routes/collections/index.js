import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),

    title: "Browse",

    model(params) {
        return Ember.RSVP.hash({
            "title": this.title,
            "collection": this.modelFor('collection')
        });
    },

    afterModel(model, transition) {
        this.set("path.parts", transition.targetName.split(".").map((cur, i, arr) => {
            let routeName = arr.slice(0, i+1).join(".");
            let model = this.modelFor(routeName);
            return {
                label: model.title,
                route: routeName,
                routePart: cur
            };
        }));
    },

    setupController(controller, data) {
        controller.set("title", data.title);
        controller.set("collections", data.collection);
    },

});
