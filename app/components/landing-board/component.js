import Ember from 'ember';

export default Ember.Component.extend({
    listColumns: Ember.computed('layout', function() {
        const dataSource = this.get('layout.data');
        const list = this.get('model.settings').data[dataSource];
        const column = {};
        const splitIndex = Math.round(list.length / 2);
        column.left = list.splice(0, splitIndex);
        column.right = list;
        return column;
    }),
    containerStyle: Ember.computed('branding.colors', function() {
        return Ember.String.htmlSafe(`background-color: ${this.get('branding.colors.background')}; color: ${this.get('branding.colors.backgroundText')}`);
    }),
});
