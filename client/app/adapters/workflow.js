import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';


export default DS.RESTAdapter.extend({
    ajax(url, method, hash) {
        hash = hash || {};
        hash.headers = hash.headers || {};
        return this._super(url, method, hash);
    },
    buildURL() {
        var base = this._super(...arguments);
        return `http://localhost:4200/data${base}.json`;
    }
});
