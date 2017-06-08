import Ember from 'ember';


export default Ember.Component.extend({

    description: "Enter a title for the preprint.",

    didReceiveAttrs: function() {
        this.set('description', this.attrs.description);
    },

    textFieldValueObserver: Ember.observer('textFieldValue', function() {
        const SAVE_PARAMETER = this.attrs.saveParameter;
        const PARAMETERS = this.attrs.widget.value.parameters;
        SAVE_PARAMETER(PARAMETERS.output, {
            state: ['defined'],
            value: this.get('textFieldValue')
        });
    }),

});
