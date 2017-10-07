import Ember from 'ember';
import ENV from '../../config/environment';

function getToken() {
    let token;
    const session = window.localStorage['ember_simple_auth-session'];
    if (session) {
        token = JSON.parse(session).authenticated;
        if ('attributes' in token) {

            return token.attributes.accessToken;
        }
        return token;
    }
}

export default Ember.Component.extend({

    store: Ember.inject.service(),

    buttonString: 'Save',
    disabled: false,
    description: 'Submit',

    parameters: {},

    init() {
        this.set('parameters.type', {
            value: 'meeting'}
        );
        return this._super(...arguments);
    },

    actions: {
        async pressButton() {
            console.log("Approved")
        },
    },

});
