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
            const location = this.get('modelCache.location');
            const address = this.get('modelCache.address');
            const startDate = this.get('modelCache.startDate');
            const endDate = this.get('modelCache.endDate');

            model.set('settings', JSON.parse(this.get('modelCache.settings')));
            model.set('title', this.get('modelCache.title'));
            model.set('description', this.get('modelCache.description'));
            model.set('tags', this.get('modelCache.tags'));
            model.set('location', location);
            model.set('address', address);
            model.set('startDate', startDate);
            model.set('endDate', endDate);
            model.save();
            this.set('editMode', false);
        },
        updateCacheSettings (jsonSettings) {
            this.set('modelCache.settings', JSON.stringify(jsonSettings));
        },
        deleteCollection() {
            this.get('model').destroyRecord().then(() => this.transitionToRoute('/'));
        },
    },
    resetModelCache() {
        const model = this.get('model');
        return {
            title: model.get('title'),
            description: model.get('description'),
            tags: model.get('tags'),
            settings: JSON.stringify(model.get('settings')),
            location: model.get('location'),
            address: model.get('address'),
            startDate: model.get('startDate'),
            endDate: model.get('endDate')
        };
    },

});
