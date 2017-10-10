import Ember from "ember";

export default Ember.Component.extend({

    tagName: "div",
    classNames: ["radio"],
    attributeBindings: ["type", "checked", "value", "name", "disabled"],

    checked: Ember.computed("tagName", function() {
        
    }),

});
