import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    tagName: "section",
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),
    containerStyle: Ember.computed('layout', function() {
        return Ember.String.htmlSafe(`background-color: ${this.get('layout.background_color')}; color: ${this.get('layout.text_color')};`);
    }),
    users: Ember.computed('model.items', function() {
        const items = this.get('model.items');
        const userIDs = [];
        items.forEach((item) => {
            const userID = item.get('createdBy.id');
            if (userID !== undefined) {
                userIDs.push(userID);
            }
        });
        return _.uniq(userIDs).map((userID) => {
            return this.get('store').findRecord('user', userID);
        });
    })
});
