import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    tags: DS.attr('string'),
    createdBy: DS.belongsTo('user'),
    dateCreated: DS.attr('date'),
    dateUpdated: DS.attr('date'),
    settings: DS.attr('object'),
    groups: DS.hasMany('group'),
    items: DS.hasMany('items')
});
