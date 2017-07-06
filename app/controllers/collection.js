import Ember from 'ember';

export default Ember.Controller.extend({

    searchGuid: 'fkat6',
    loadingGuid: false,
    organizeMode: false,

    breadCrumb: Ember.computed('model.title', function () {
        return this.get('model.title');
    }),

    actions: {
        toggleOrganizeMode () {
            this.toggleProperty('organizeMode');
        },
    },

});
