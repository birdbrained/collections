import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
} = DS;

export default Model.extend({
    title: attr(),
    sections: hasMany('section'),
    actions: hasMany('action'),
    initialParameters: hasMany('parameter'),
});
