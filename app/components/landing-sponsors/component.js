import Ember from 'ember';

export default Ember.Component.extend({
    containerStyle: Ember.computed('layout', function() {
        const bg = this.get('layout.background_color') ? this.get('layout.background_color') : this.get('branding.colors.background');
        const txt = this.get('layout.text_color') ? this.get('layout.text_color') : this.get('branding.colors.text');
        return Ember.String.htmlSafe(`background-color: ${bg}; color: ${txt}`);
    }),
    data: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        return this.get('model.settings').data[dataSource];
    })
});
