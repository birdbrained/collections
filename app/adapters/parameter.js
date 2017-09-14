import DS from 'ember-data';
import ENV from '../config/environment';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({
    caxe: Ember.inject.service(),
    ajax(url, method, hash) {
        hash = hash || {};
        hash.headers = hash.headers || {};
        return this._super(url, method, hash);
    },
    buildURL(type, id) {
        debugger;
        const base = this._super(...arguments);
        let url = [];
        url.push(ENV.APP.apiURL)
        let caxe = this.get('caxe.activeCase');
        if (caxe) {
            url.push(`/cases/${caxe}`);
        }
        url.push(base);
        return url.join('');
    }
});
