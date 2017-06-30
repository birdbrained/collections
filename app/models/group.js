import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    collection: DS.belongsTo('collection'),
    tags: DS.attr('string'),
    createdBy: DS.belongsTo('user'),
    dateCreated: DS.attr('date'),
    dateUpdated: DS.attr('date'),
    items: DS.hasMany('item')
});
