import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    newCollectionTitle: '',
    modelCache: null,
    filterText: '',
    currentPage: 1,
    loadingMore: false,
    showLoadMore: Ember.computed('model.meta', function() {
        return this.get('model.meta.pagination.count') > this.get('model.length');
    }),
    actions: {
        filter () {
            const model = this.get('model');
            const text = this.get('filterText').toLowerCase();
            if (this.get('modelCache') === null) {
                this.set('modelCache', model);
            }
            this.set('model', this.get('modelCache').filter(function(item) {
                return item.get('title').toLowerCase().includes(text);
            }));
        },
        addCollection () {
            const collection = this.store.createRecord('collection', {
                title: this.get('newCollectionTitle'),
                tags: '',
                description: '',
            });
            collection.save().then((record) => {
                this.set('newCollectionTitle', '');
                this.set('filterText', '');
                this.transitionToRoute('collection', record);
            },
            );
        },
        clearFilter() {
            this.set('filterText', '');
        },
        enterPress() {
            this.get('actions').addCollection.call(this);
        },
        loadMore() {
            this.set('loadingMore', true);
            this.store.query('collection', {
                page: this.get('currentPage') + 1,
            }).then((data) => {
                this.incrementProperty('currentPage');
                const currentModel = this.get('model').toArray();
                const arr = data.toArray();
                currentModel.pushObjects(arr);
                this.set('model', currentModel);
                this.set('loadingMore', false);
            });
        },
    },
});
