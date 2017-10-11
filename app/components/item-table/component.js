import Ember from 'ember';
import _ from 'lodash';
import ENV from '../../config/environment';


export default Ember.Component.extend({
    filterString: '',
    eventFilter: '',
    searchResults: null,
    pageNumber: 1,
    totalPages: 1,
    searchInput: '',
    tagName: "section",
    theadStyle: Ember.computed('layout', function () {
        const headerColor = this.get('layout.background_color') ? this.get('layout.background_color') : this.get('branding.colors.primary');
        const textColor = this.get('layout.text_color') ? this.get('layout.text_color') : this.get('branding.colors.text');
        return Ember.String.htmlSafe(`background-color: ${headerColor}; color: ${textColor};`);
    }),
    eventTypes: Ember.computed('model', function () {
        return this.get('model.items').then((results) => {
            const eventsList = [];
            results.forEach(function (i) {
                eventsList.push(i.get('type'));
            });
            return _.uniq(eventsList).sort();
        });
    }),
    actions: {
        search() {
            // make a call to the collections endpoint
            const input = this.get('searchInput');
            const modelId = this.get('model.id');
            const pageNumber = this.get('pageNumber');
            let query = `${ENV.apiBaseUrl}/api/items/search/?collection=${modelId}&page=${pageNumber}`;
            if (input !== '') {
                query += `&text__contains=${input}`;
            }
            return Ember.$.get(query, (data) => {
                this.set('searchResults', data);
            });
        },
        nextPage() {
            this.set('pageNumber', this.get('pageNumber') + 1);
            const modelId = this.get('model.id');
            const pageNumber = this.get('pageNumber');
            const input = this.get('searchInput');

            Ember.$.get(`${ENV.apiBaseUrl}/api/items/search/?collection=${modelId}&page=${pageNumber}&text__contains=${input}`, (data) => {
                this.set('searchResults', data);
                this.set('totalPages', data.meta.pagination.pages);
            });
        },
        prevPage() {
            this.set('pageNumber', this.get('pageNumber') - 1);
            const modelId = this.get('model.id');
            const pageNumber = this.get('pageNumber');
            const input = this.get('searchInput');

            Ember.$.get(`${ENV.apiBaseUrl}/api/items/search/?collection=${modelId}&page=${pageNumber}&text__contains=${input}`, (data) => {
                this.set('searchResults', data);
                this.set('totalPages', data.meta.pagination.pages);
            });
        }
    },
    didReceiveAttrs() {
        const modelId = this.get('model.id');
        const pageNumber = this.get('pageNumber');
        Ember.$.get(`${ENV.apiBaseUrl}/api/items/search/?collection=${modelId}&page=${pageNumber}`, (data) => {
            this.set('searchResults', data);
            this.set('totalPages', data.meta.pagination.pages);
        });
    }
});
