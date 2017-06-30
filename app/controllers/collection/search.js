import Ember from 'ember';

export default Ember.Controller.extend({
    searchText: '',
    results: Ember.A(),
    actions: {
        search () {
            const text = this.get('searchText');
            this.get('store').query('item', {
                filter: {
                    title: text,
                },
            }).then((results) => {
                this.set('results', results);
            });
        },
    },
});
