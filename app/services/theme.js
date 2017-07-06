import Ember from 'ember';
import config from 'ember-get-config';

const {
    Service,
    inject,
    computed,
} = Ember;
/**
 * @module ember-preprints
 * @submodule services
 */

/**
 * Detects preprint provider and allows you to inject that
 * provider's theme into parts of your application
 *
 * @class theme
 * @extends Ember.Service
 */
export default Service.extend({
    store: inject.service(),
    session: inject.service(),

    // If we're using a provider domain
    isDomain: false,

    // The id of the current provider
    id: config.PREPRINTS.defaultProvider,

    currentLocation: null,

    // The provider object
    provider: computed('id', function() {
        const id = this.get('id');

        if (!id) { return; }

        return this
            .get('store')
            .findRecord('preprint-provider', id);
    }),

    // If we're using a branded provider
    isProvider: computed('id', function() {
        return this.get('id') !== 'osf';
    }),

    // If we're using a branded provider and not
    // under a branded domain (e.g. /preprints/<provider>)
    isSubRoute: computed('isProvider', 'isDomain', function() {
        return this.get('isProvider') && !this.get('isDomain');
    }),

    pathPrefix: computed('isProvider', 'isDomain', 'id', function() {
        let pathPrefix = '/';

        if (!this.get('isDomain')) {
            pathPrefix += 'preprints/';

            if (this.get('isProvider')) {
                pathPrefix += `${this.get('id')}/`;
            }
        }

        return pathPrefix;
    }),

    // Needed for the content route
    guidPathPrefix: computed('isSubRoute', 'id', function() {
        let pathPrefix = '/';

        if (this.get('isSubRoute')) {
            pathPrefix += `preprints/${this.get('id')}/`;
        }

        return pathPrefix;
    }),

    // The URL for the branded stylesheet
    stylesheet: computed('id', function() {
        const id = this.get('id');

        if (!id) { return; }

        const prefix = this.get('isDomain') ? '' : '/preprints';
        const suffix = config.ASSET_SUFFIX ? `-${config.ASSET_SUFFIX}` : '';
        return `${prefix}/assets/css/${id}${suffix}.css`;
    }),

    // The logo object for social sharing
    logoSharing: computed('id', function() {
        const id = this.get('id');

        const logo = config.PREPRINTS.providers
            .find(provider => provider.id === id)
            .logoSharing;

        logo.path = `/preprints${logo.path}`;

        return logo;
    }),

    // The url to redirect users to sign up to
    signupUrl: computed('id', function() {
        const query = Ember.$.param({
            campaign: `${this.get('id')}-preprints`,
            next: window.location.href,
        });

        return `${config.OSF.url}register?${query}`;
    }),

    redirectUrl: computed('currentLocation', function() {
        return this.get('currentLocation');
    }),

    // The translation key for the provider's permission language
    permissionLanguage: computed('id', function() {
        const id = this.get('id');

        return config.PREPRINTS.providers
            .find(provider => provider.id === id)
            .permissionLanguage;
    }),
});
