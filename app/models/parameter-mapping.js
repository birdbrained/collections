import DS from 'ember-data';

const {
    Model,
    attr,
    belongsTo,
} = DS;

export default Model.extend({
    mappingKey: attr('string'),
    widget: belongsTo('widget', {
        inverse: 'parameterMapping',
    }),
    parameter: belongsTo('parameter', {
        inverse: null,
    }),
});
