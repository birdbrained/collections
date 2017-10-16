import config from 'ember-get-config';
import AnalyticsMixin from 'ember-osf/mixins/analytics';
import Ember from 'ember';

/**
 * @module ember-osf
 * @submodule components
 */

/**
 * Display the new OSF navbar - features primary navigation to toggle between services - HOME, PREPRINTS, REGISTRIES, and MEETINGS,
 * and secondary navigation links for each particular service.
 *
 * Sample usage:
 * ```handlebars
 * {{osf-navbar
 *   loginAction=loginAction
 * }}
 * ```
 *
 * @class osf-navbar
 */
export default Ember.Component.extend(AnalyticsMixin, {

    elementId: 'osf-nav',
    tagName: 'nav',
    classNames: [],

    navLinks: [
        {
            name: "Explore",
            type: "link-to",
            route: "explore"
        },
        {
            name: "My Collection",
            type: "link-to",
            route: "collections.my-collection"
        },
        {
            name: "Support",
            type: "link",
            href: "https://osf.io/support/"
        },
    ],

    session: Ember.inject.service(),
    showSearch: false,
    osfServices: {

    },
    currentService: Ember.computed(function() { // Pulls current service name from consuming service's config file
        let appName = 'Collections';
        if (appName === 'Dummy App') {
            appName = 'Home';
        }
        return appName.toUpperCase();
    }),
    currentServiceLink: Ember.computed('currentService', function() {
        const serviceMapping = {
            HOME: 'osfHome',
            PREPRINTS: 'preprintsHome',
            REGISTRIES: 'registriesHome',
            MEETINGS: 'meetingsHome',
            COLLECTIONS: 'collectionsHome'
        };
        const service = this.get('currentService');
        return '/';
    }),
    actions: {
        // Toggles whether search bar is displayed (for searching OSF)
        toggleSearch() {
            this.toggleProperty('showSearch');
            this.send('closeSecondaryNavigation');
        },
        closeSecondaryNavigation() {
            this.$('.navbar-collapse').collapse('hide');
        },
        closeSearch() {
            this.set('showSearch', false);
        },
        closeSecondaryAndSearch() {
            this.send('closeSecondaryNavigation');
            this.send('closeSearch');
        }
    },
    host: config.OSF.url,

});
