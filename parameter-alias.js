import DS from 'ember-data';

const {
    Model,
    attr,
    belongsTo,
} = DS;

export default Model.extend({

    name: attr('string'),

    widget: belongsTo('widget', {
        inverse: 'parameterAlias',
    }),

    parameter: belongsTo('parameter', {
        inverse: 'parameterAlias',
    })

});