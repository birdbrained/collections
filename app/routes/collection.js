import Ember from 'ember';

export default Ember.Route.extend({
    model (params) {
        return this.store.findRecord('collection', params.collection_id).then((data) => {
            return data;
        }).catch(() => {
            this.transitionTo('/not-found');
        });
    },
});
