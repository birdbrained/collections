import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
    belongsTo,
} = DS;

export default Model.extend({
    type: attr('string'),
    conditions: hasMany('condition'),
    inputParameters: hasMany('parameter'),
    outputParameters: belongsTo('parameter'),
});
