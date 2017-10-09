import Ember from "ember";

export default Ember.component.extend({

    tagName: "div",
    className:"radio",
    attributeBindings: ["type", "checked", "value", "name", "disabled"],

    checked: Ember.computed(),

});
