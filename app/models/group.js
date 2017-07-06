import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
    belongsTo,
} = DS;

export default Model.extend({
    title: attr('string'),
    description: attr('string'),
    tags: attr('string'),
    dateCreated: attr('date'),
    dateUpdated: attr('date'),
    collection: belongsTo('collection'),
    createdBy: belongsTo('user'),
    items: hasMany('item'),
});
