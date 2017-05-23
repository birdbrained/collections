import Ember from 'ember';


export default Ember.Component.extend({

    description: "Enter a title for the preprint.",

    didReceiveAttrs: function() {
        this.set('description', this.attrs.description);
    },

    textFieldValueObserver: Ember.observer('textFieldValue', function() {

        this.attrs.saveParameter({
            state: ['defined'],
            value: this.get('textFieldValue')
        })

    }),

});
