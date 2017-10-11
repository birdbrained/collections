import Ember from 'ember';
import _ from 'lodash';
import moment from 'moment';

export default Ember.Component.extend({

    session: Ember.inject.service(),
    store: Ember.inject.service(),
    tagName: "section",
    filterString: '',
    trackFilter: '',
    roomFilter: '',
    selectedItemId: 0,

    classNames: ["schedule"],

    data: Ember.computed('layout', function () {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    }),

    style: Ember.computed('layout', function() {
        const bg = this.get('layout.background_color') ? `background-color:${this.get('layout.background_color')};` : '';
        const txt = this.get('layout.text_color') ? `color: ${this.get('layout.text_color')};` : '';
        return Ember.String.htmlSafe(bg + txt);
    }),
    attributeBindings: ['style'],

    items: Ember.computed('model', function () {
        // fetches the items, sorts them into buckets by start time, returns them as a list
        return this.get('model.items').then((results) => {
            const tempList = [];
            results.forEach(function (i) {
                tempList.push(i);
            });
            const tempItems = tempList.sort(function (a, b) {
                const startTimeA = moment(a.get('startTime'));
                const startTimeB = moment(b.get('startTime'));
                const endTimeA = moment(a.get('endTime'));
                const endTimeB = moment(b.get('endTime'));
                const locationA = a.get('location');
                const locationB = b.get('location');

                // Sorts by: 1st) start time, 2nd) end time, 3rd) location
                if (startTimeA.isSame(startTimeB)) {
                    if (endTimeA.isSame(endTimeB)) {
                        return locationA > locationB;
                    } else {
                        return endTimeA.diff(endTimeB);
                    }
                } else {
                    return startTimeA.diff(startTimeB);
                }
            });

            const retList = [];
            tempItems.forEach(function (i) {
                if (retList.length === 0) {
                    retList.push([i]);
                } else if (retList[retList.length - 1][0].get('startTime') === i.get('startTime')) {
                    retList[retList.length - 1].push(i);
                } else {
                    retList.push([i]);
                }
            });
            if (retList.length > 0) {
                this.set('selectedItemId', retList[0][0].id);
            }
            return retList;
        });
    }),
    rooms: Ember.computed('model', function () {
        return this.get('model.items').then((results) => {
            const roomsList = [];
            results.forEach(function (i) {
                roomsList.push(i.get('location'));
            });
            return _.uniq(roomsList).sort();
        });
    }),
    tracks: Ember.computed('model', function () {
        return this.get('model.items').then((results) => {
            const tracksList = [];
            results.forEach(function (i) {
                if (i.get('track')) {
                    tracksList.push(i.get('track'));
                }
            });
            return _.uniq(tracksList).sort();
        });
    }),
    selectedItem: Ember.computed('selectedItemId', 'model', function() {
        const id = parseInt(this.get('selectedItemId'), 10);
        if (id >= 0) {
            return this.get('store').findRecord('item', id).then((i) => {
                return i;
            });
        }
    })
});
