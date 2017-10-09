import Ember from 'ember';

export default Ember.Controller.extend({

    session: Ember.inject.service(),
    searchGuid: 'fkat6',
    loadingGuid: false,
    organizeMode: false,

    actions: {

        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        },

        changeRoute(path, params) {
            this.transitionToRoute(path, params);
        },

    }

});
