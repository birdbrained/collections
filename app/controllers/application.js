import Ember from 'ember';


export default Ember.Controller.extend({

    session: Ember.inject.service(),
    path: Ember.inject.service(),

    init() {
        this._super();
        window.addEventListener("scroll", function() {
            let nav = document.getElementById("osf-nav");
            if (window.pageYOffset > 60) {
                nav.style.position = "fixed";
                nav.style.top = "-1px";
            } else {
                nav.style.position = "absolute";
                nav.style.top = "60px";
            }
        })
    },

    updateCurrentPath: Ember.observer('currentPath', function() {
        this.set('path.currentPath', this.get('currentPath'));
    }),

    actions: {
        login() {
            this.get('session').authenticate('authenticator:osf-token');
        },
    },


});
