import DS from 'ember-data';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({
    ajax(url, method, hash) {
        hash = hash || {};
        hash.headers = hash.headers || {};
        return this._super(url, method, hash);
    },
    buildURL() {
        const base = this._super(...arguments);
        return `http://localhost:4200/data${base}.json`;
    },
});
