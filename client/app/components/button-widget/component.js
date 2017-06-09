import Ember from 'ember';


export default Ember.Component.extend({

    didReceiveAttrs() {
        this.set('widgetClasses', this.attrs.widget.value.cssClasses)
    },

    buttonString: 'Save',

    widgetClasses: ['section-submit-button'],
    widgetClassString: Ember.computed('widgetClasses', function() {
        const classes = this.get('widgetClasses')
        if (classes === undefined ||
            classes.constructor !== Array
        ) {
            return '';
        }
        return classes.join(' ');
    }),

    actions: {
        async pressButton() {
            const parameters = this.attrs.widget.value.parameters;
            this.attrs.saveParameter(parameters.parameter, {
                value: await this.get('action')(this),
                state: ['defined']
            });
        }
    }

});
