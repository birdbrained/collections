import Ember from 'ember';

export default Ember.Controller.extend({
    organizeMode: false,
    cardView: true,
    showDeleteItemConfirmation: false, // Modal for deleting items
    selectedItems: Ember.A(),
    actions: {
        clearSelected() {
            const selected = this.get('selectedItems');
            selected.clear();
        },
        clearModals() {
            this.set('showDeleteItemConfirmation', false);
        },
        deleteSelected() {
            const items = this.get('model.items');
            const selected = this.get('selectedItems');
            selected.forEach(item =>
                Ember.run.once(() =>
                    item.destroyRecord(),
                ));
            items.removeObjects(selected);
            this.send('clearSelected');
            this.send('clearModals');
        },
        // Adds or removes item to the selectedItems list
        toggleSelectedList(selected, item) {
            const currentList = this.get('selectedItems');
            if (!selected) {
                currentList.removeObject(item);
            } else {
                currentList.addObject(item);
            }
        },
        changeRoute(path, params) {
            this.transitionToRoute(path, params);
        },
        changeView(cardView) {
            this.set('cardView', cardView);
        },
    },
});
