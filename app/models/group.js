import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
    blenogsTo,
} = DS;

export default Model.extend({
    title: attr('string'),
    description: attr('string'),
    collection: belongsTo('collection'),
    tags: attr('string'),
    createdBy: belongsTo('user'),
    dateCreated: attr('date'),
    dateUpdated: attr('date'),
    items: hasMany('item'),
});
