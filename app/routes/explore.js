import Ember from 'ember';

export default Ember.Route.extend({

    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    title: "Explore",

    model(params) {
        return Ember.RSVP.hash({
            collections: this.store.findAll('collection'),
            title: this.get("title")
        });
    },

    afterModel(model, transition) {
        this.set("navLinks.links", [
            {
                label: "Showcase",
                route: "explore"
            },
            {
                label: "Trending",
                route: "explore"
            }
        ]);
    },

    setupController(collection, data) {
        collection.set('collections', data.collections);
        collection.set("title", data.title)
        this.set("path.parts", this.routeName.split(".").map((cur, i, arr) => {
            let routeName = arr.slice(0, i+1).join(".");
            let controller = this.controllerFor(routeName);
            return {
                label: controller.title,
                route: routeName,
                routePart: cur
            };
        }));
    }

});