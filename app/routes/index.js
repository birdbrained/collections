import Ember from 'ember';

export default Ember.Route.extend({
    model () {
        return this.store.query('collection', {
            page: 1,
        }).then(function(data) {
            return data;
        });
    },
});
