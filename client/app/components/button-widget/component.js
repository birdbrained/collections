import Ember from 'ember';


export default Ember.Component.extend({

    didReceiveAttrs() {
        this.set('widgetClasses', this.attrs.widget.value.cssClasses)
    },

    buttonString: 'Save',

    widgetClasses: ['section-submit-button'],
    widgetClassString: Ember.computed('widgetClasses', function() {
        const CLASSES = this.get('widgetClasses')
        if (CLASSES === undefined ||
            CLASSES.constructor !== Array
        ) {
            return '';
        }
        return CLASSES.join(' ');
    }),

    actions: {
        async pressButton() {
            const PARAMETERS = this.attrs.widget.value.parameters;
            this.attrs.saveParameter(PARAMETERS.parameter, {
                value: await this.get('action')(this),
                state: ['defined']
            });
        }
    }

});
