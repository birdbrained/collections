import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

import ENV from '../config/environment';

export default BaseAuthenticator.extend({
    session: Ember.inject.service(),

    csrfToken() {
        if (!document.cookie && document.cookie === '') {
            return null;
        }
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, ENV.csrfCookie.length + 1) === `${ENV.csrfCookie}=`) {
                return decodeURIComponent(cookie.substring(ENV.csrfCookie.length + 1));
            }
        }
    },

    restore() {
        return this.authenticate(false);
    },

    authenticate(redirectToLogin = true) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            this.getUserInfo().then((response) => {
                response = response.data.attributes;
                if (!response || !response.token) {
                    if (redirectToLogin) {
                        window.location = `${ENV.apiBaseUrl
                        }/accounts/osf/login/?${
                            Ember.$.param({ next: ENV.apiBaseUrl })}`;
                        return window.location;
                    }
                    reject('not logged in');
                } else {
                    resolve({
                        user: response,
                        csrfToken: this.csrfToken(),
                        attributes: {
                            accessToken: response.token,
                        },
                    });
                }
            });
        });
    },

    invalidate() {
        return Ember.$.ajax({
            method: 'POST',
            url: `${ENV.apiBaseUrl}/accounts/logout/`,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: {
                'X-CSRFTOKEN': this.get('session.data.authenticated.csrfToken'),
            },
        });
    },

    getUserInfo() {
        return Ember.$.ajax({
            url: `${ENV.APP.apiURL}/userinfo/`,
            crossDomain: true,
            xhrFields: { withCredentials: true },
        });
    },
});