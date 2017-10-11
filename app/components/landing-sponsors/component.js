import Ember from 'ember';

export default Ember.Component.extend({

    attributeBindings: ['style'],
    classNames: ["landing-sponsors"],
    tagName: "section",
    style: Ember.computed('layout', function() {
        const bg = this.get('layout.background-color') ? this.get('layout.background-color') : this.get('branding.colors.background');
        const txt = this.get('layout.text-color') ? this.get('layout.text-color') : this.get('branding.colors.text');
        return Ember.String.htmlSafe(`background-color: ${bg}; color: ${txt}`);
    }),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    })
});
