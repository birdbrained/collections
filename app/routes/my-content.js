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
                route: "my-content"
            },
            {
                label: "In Progress",
                route: "my-content"
            },
            {
                label: "Settings",
                route: "my-content"
            }
        ]);
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
        controller.set("collections", data.collections);
    },
});
