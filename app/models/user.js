import DS from 'ember-data';

const {
    Model,
    attr,
} = DS;

export default Model.extend({
    username: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    fullName: attr('string'),
});
