import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        changeRoute(path, params){
            this.get('changeRoute')(path, params);
        }
    }
});
