import Ember from 'ember';
import DS from 'ember-data';

const {
    computed
} = Ember;

const {
    Model,
    attr,
    hasMany,
} = DS;

export default Model.extend({
    label: attr('string'),
    description: attr('string'),
    widgets: hasMany('widget'),
    divId: computed('label', function() {
        return this.get('label').dasherize();
    }),
});
