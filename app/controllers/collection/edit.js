import Ember from 'ember';

export default Ember.Controller.extend({

    session: Ember.inject.service(),

    editMode: false,
    collectionSettings: {},

    modelCache: Ember.computed('model', function() {
        return this.resetModelCache();
    }),
    formattedTags: Ember.computed('model.tags', function() {
        const tags = this.get('model.tags');
        if (tags) {
            return this.get('model.tags').split(',');
        }
        return [];
    }),
    settingsString: Ember.computed('model.settings', function() {
        return JSON.stringify(this.get('model.settings'));
    }),

    resetModelCache() {
        const model = this.get('model');
        return {
            title: model.get('title'),
            description: model.get('description'),
            tags: model.get('tags'),
            settings: JSON.stringify(model.get('settings')),
        };
    },

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
            model.set('settings', JSON.parse(this.get('modelCache.settings')));
            model.set('title', this.get('modelCache.title'));
            model.set('description', this.get('modelCache.description'));
            model.set('tags', this.get('modelCache.tags'));
            model.save();
            this.set('editMode', false);
        },
        deleteCollection() {
            this.get('model').destroyRecord().then(() => this.transitionToRoute('/'));
        },
    },

});
