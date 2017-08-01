import DS from 'ember-data';
import hashMany from 'collections/utils/hash-many';

const {
    Model,
    attr,
    belongsTo,
} = DS;

export default Model.extend({
    label: attr('string'),
    description: attr('string'),
    type: attr('string'),
    defaultValue: attr('string'),
    parameters: hashMany('parameter'),
});
