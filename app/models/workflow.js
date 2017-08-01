import Ember from 'ember';
import DS from 'ember-data';

const {
    Model,
    attr,
    hasMany,
} = DS;

export default Model.extend({
    title: attr('string'),
    description: attr('string'),
    sections: hasMany('section', {
        async: false,
        inverse: null,
        embedded: 'always',
    }),
    //sections: Ember.computed('_sections', function() {
    //    return this.get('_sections');
    //}),
    actions: hasMany('action', {
        async: false,
        inverse: null,
        embedded: 'always',
    }),
    initialParameters: hasMany('parameter', {
        async: false,
        inverse: null,
        embedded: 'always'
    }),
});
