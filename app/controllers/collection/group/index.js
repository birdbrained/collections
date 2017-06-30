import Ember from 'ember';

export default Ember.Controller.extend({
    organizeMode: false,
    cardView: true,
    selectedItems : Ember.A(),
    showDeleteItemConfirmation: false, // Modal for deleting items
    actions : {
        clearSelected() {
            let selected = this.get('selectedItems');
            selected.clear();
        },
        clearModals() {
              this.set('showDeleteItemConfirmation', false);
        },
        deleteSelected() {
            let items = this.get('model.items');
            let selected = this.get('selectedItems');
            selected.forEach(item =>
                Ember.run.once(() =>
                  item.destroyRecord()
            ));
            items.removeObjects(selected);
            this.send('clearSelected');
            this.send('clearModals');
        },
        // Adds or removes item to the selectedItems list
        toggleSelectedList(selected, item){
            let currentList = this.get('selectedItems');
            if(!selected){
                currentList.removeObject(item);
            } else {
                currentList.addObject(item);
            }
        },
        changeRoute(path, params){
            this.transitionToRoute(path, params);
        },
        changeView(cardView) {
            this.set('cardView', cardView);
        }
    }
});
