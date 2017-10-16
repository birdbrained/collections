import DS from 'ember-data';
import Ember from 'ember';

const {
    Model,
    attr,
    belongso
} = DS;

export default Model.extend({
    username: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    fullName: attr('string'),
    gravatar: attr('string'),
    collection: belongsTo("collection", {
        async: false,
        inverse: null
    }),
    computedFullName: Ember.computed('firstName', 'lastName', function () {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),
});
