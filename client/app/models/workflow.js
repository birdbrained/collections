import DS from 'ember-data';

export default DS.Model.extend({
    submissionFormName: DS.attr(),
    sections: DS.attr(),
    initialWidgets: DS.attr(),
    actions: DS.attr(),
    initialParameters: DS.attr(),
});
