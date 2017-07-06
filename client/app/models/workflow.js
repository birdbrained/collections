import DS from 'ember-data';

const {
    Model,
    attr,
} = DS;

export default Model.extend({
    submissionFormName: attr(),
    sections: attr(),
    initialWidgets: attr(),
    actions: attr(),
    initialParameters: attr(),
});
