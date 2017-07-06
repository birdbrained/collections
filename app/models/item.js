import DS from 'ember-data';

const {
    Model,
    attr,
    belongsTo,
} = DS;

export default Model.extend({
    source_id: attr('string'),
    title: attr('string'),
    type: attr('string'),
    status: attr('string'),
    url: attr('string'),
    metadata: attr('string'),
    dateAdded: attr('date'),
    dateUpdated: attr('date'),
    collection: belongsTo('collection'),
    group: belongsTo('group'),
    createdBy: belongsTo('user'),
});
