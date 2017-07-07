import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
} = DS;

export default Model.extend({
    label: attr('string'),
    description: attr('string'),
    type: attr('string'),
    defaultValue: attr('string'),
    parameter: belongsTo('parameter'),
});
