import Ember from 'ember';

export default Ember.Component.extend({
    editMode: false,
    showDeleteGroupConfirmation: false, // Modal for deleting group
    modelCache: Ember.computed('model', function() {
        return this.resetModelCache();
    }),
    actions: {
        showEdit () {
            this.set('editMode', true);
        },
        cancelEdit() {
            this.set('editMode', false);
            this.set('modelCache', this.resetModelCache());
        },
        saveEdit () {
            const model = this.get('model');
            model.set('title', this.get('modelCache.title'));
            model.set('description', this.get('modelCache.description'));
            model.save();
            this.set('editMode', false);
        },
        deletePartial() {
            // Move items to collection before deleting group
            const items = this.get('model.items');
            items.forEach((item) => {
                item.set('group', null);
                item.save();
            });
            this.send('deleteGroup');
            this.set('showDeleteGroupConfirmation', false);
        },
        deleteGroup() {
            // Delete group and any items it contains
            const collection = this.get('model.collection');
            this.get('model').destroyRecord().then(() => {
                this.set('showDeleteGroupConfirmation', false);
                this.get('changeRoute')('collection.browse', collection.get('id'));
            },
            );
        },
    },
    resetModelCache() {
        const model = this.get('model');
        return {
            title: model.get('title'),
            description: model.get('description'),
        };
    },
});
