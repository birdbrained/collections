import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    actions: {
        changeRoute(path, params){
            this.transitionToRoute(path, params);
        }
    }
});
