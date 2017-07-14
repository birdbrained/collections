import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
    belongsTo,
} = DS;

export default Model.extend({
    all: hasMany('condition', {inverse: null}),
    any: hasMany('condition', {inverse: null}),
    none: hasMany('condition', {inverse: null}),
    parameter: belongsTo('parameter'),
    value: attr('string'),
    properties: attr(),
});
