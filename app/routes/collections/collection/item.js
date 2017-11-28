import Ember from 'ember';

export default Ember.Route.extend({

    crumb: {}, 
    item:'',
    collection:'',
    model(params) {
        let collection = this.modelFor('collections.collection');
        this.set('collection', collection)
        let item = this.store.findRecord('item', params.item_id);
        this.set('item', item)
        let node = item.then((_item) => {
            return this.store.findRecord('node', _item.get('sourceId'));
        });
        let approvalCase = item.then((_item) => {
            return this.get('store').queryRecord('case', {
                for_item: _item.id,
                role: 'approval'
            });
        });
        return Ember.RSVP.hash({
            collection,
            item,
            node,
            approvalCase
        });
    },

    afterModel(model, transition) {
        this.set('crumb.label', this.get('item.title'));
        this.set('crumb.route', this.routeName);
        this.set('crumb.models', [
            this.get('collection'),
            this.get('item')
        ]);

        this.set('nav.links', [{
            label: 'Edit',
            route: 'collections.collection.submissions',
            models: []
        }]);
    },

    setupController(controller, data) {
        controller.set('collection', data.collection);
        controller.set('item', this.get('item'));
        controller.set('node', data.node);
        controller.set('approvalCaseId', data.approvalCase.id);
    }

});
