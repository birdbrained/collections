import DS from 'ember-data';

export default DS.Model.extend({
    source_id: DS.attr('string'),
    title: DS.attr('string'),
    type: DS.attr('string'),
    status: DS.attr('string'),
    url: DS.attr('string'),
    collection: DS.belongsTo('collection'),
    group: DS.belongsTo('group'),
    createdBy: DS.belongsTo('user'),
    metadata: DS.attr('string'),
    dateAdded: DS.attr('date'),
    dateUpdated: DS.attr('date')
});
