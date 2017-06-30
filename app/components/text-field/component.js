import Ember from 'ember';


export default Ember.Component.extend({

    description: 'Enter a title for the preprint.',

    didReceiveAttrs() {
        this.set('description', this.attrs.description);
    },

    textFieldValueObserver: Ember.observer('textFieldValue', function() {
        const saveParameter = this.attrs.saveParameter;
        const parameters = this.attrs.widget.value.parameters;
        saveParameter(parameters.output, {
            state: ['defined'],
            value: this.get('textFieldValue'),
        });
    }),

});
