import Ember from "ember";

export default Ember.Component.extend({

    tagName: "input",
    type: "radio",

    attributeBindings: ['name:id', 'type', 'htmlChecked:checked', 'value', 'name', 'disabled'],


    htmlChecked: Ember.computed('value', 'checked', function() {
        return this.get('value') === this.get('checked');
    }),

    change: function() {
        this.set('checked', this.get('value'));
    },

    _setCheckedProp: function() {
        if (!this.$()) { return; }
        this.$().prop('checked', this.get('htmlChecked'));
    },

    _updateElementValue: Ember.observer('htmlChecked', function() {
        Ember.run.once(this, '_setCheckedProp');
    }),

});
