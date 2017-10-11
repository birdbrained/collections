import AnalyticsMixin from 'ember-osf/mixins/analytics';
import Ember from 'ember';
import config from 'ember-get-config';

/**
 * @module ember-osf
 * @submodule components
 */

/**
 * Display the login dropdown on the navbar
 *
 * Sample usage:
 * ```handlebars
 * {{new-navbar-auth-dropdown
 *   loginAction=loginAction
 *   redirectUrl=redirectUrl}}
 * ```
 *
 * @class new-navbar-auth-dropdown
 */
export default Ember.Component.extend(AnalyticsMixin, {
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    i18n: Ember.inject.service(),
    tagName: 'div',
    classNames: ['dropdown'],
    classNameBindings: ['notAuthenticated:sign-in'],
    redirectUrl: null,
    notAuthenticated: Ember.computed.not('session.isAuthenticated'),
    fullName: Ember.computed('session', function() {
       return this.get('session.session.content.authenticated.user.first-name') + ' ' + this.get('session.session.content.authenticated.user.last-name');
    }),

    /**
     * The URL to use for signup. May be overridden, eg for special campaign pages
     *
     * @property signupUrl
     * @type {String}
     */
    signupUrl: config.OSF.url + 'register',

    gravatarUrl: Ember.computed('user', function() {
        let imgLink = this.get('user.links.profile_image');

        return imgLink ? `${imgLink}&s=25` : '';
    }),
    host: config.OSF.url,
    user: null,
    _loadCurrentUser() {
        this.get('currentUser')
            .load()
            .then(user => this.set('user', user));
    },
    init() {
        this._super(...arguments);
        // TODO: React to changes in service/ event?
        if (this.get('session.isAuthenticated')) {
            this._loadCurrentUser();
        }
    },
    // TODO: These parameters are defined in osf settings.py; make sure ember config matches.
    allowLogin: true,
    enableInstitutions: true,
    actions: {
        logout() {
            const redirectUrl = this.get('redirectUrl');
            const query = redirectUrl ? '?' + Ember.$.param({ next_url: redirectUrl }) : '';
            // TODO: May not work well if logging out from page that requires login- check?
            this.get('session').invalidate()
                .then(() => window.location.href = `${config.OSF.url}logout/${query}`);
        },
    }
});
