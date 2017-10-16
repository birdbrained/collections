import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service(),
    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    title: "My Content",

    model(params) {
        return Ember.RSVP.hash({
            collections: this.store.findAll('collection', {
                user: this.get('session.session.content.authenticated.user.username')
            }),
            title: this.title
        });
    },

    afterModel(model, transition) {
        this.set("navLinks.links", [
            {
                label: "My Collection",
                route: "collections.my-collection"
            },
            {
                label: "In Progress",
                route: "collections.my-collection"
            },
            {
                label: "Settings",
                route: "collections.my-collection"
            }
        ]);
    },

    setupController(controller, data) {
        controller.set("title", data.title);
        controller.set("collections", data.collections);
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
