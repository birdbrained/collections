import Ember from 'ember';
import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
    keyForAttribute(key) {
        return Ember.String.underscore(key);
    },
    keyForRelationship(key) {
        return Ember.String.underscore(key);
    },
});
