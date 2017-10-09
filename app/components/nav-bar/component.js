import Ember from 'ember';

export default Ember.Component.extend({

    session: Ember.inject.service(),
    path: Ember.inject.service(),
    navLinks: Ember.inject.service(),

    elementId: "collections-nav",
    tagName: "nav",
    attributeBindings: ['style'],

    style: Ember.computed("model.settings.branding.colors.primary", function() {
        let pColor = this.get("model.settings.branding.colors.primary");
        if (!pColor) pColor = "rgb(22, 135, 131)";
        return "background-color:" + pColor;
    }),

});
