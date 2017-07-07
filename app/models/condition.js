import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
} = DS;

export default Model.extend({
    all: hasMany('condition'),
    any: hasMany('condition'),
    none: hasMany('condition'),
    parameter: belongsTo('parameter'),
    value: attr('string'),
    properties: attr(),
});
