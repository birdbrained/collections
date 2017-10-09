import Ember from 'ember';

export default Ember.Component.extend({

    session: Ember.inject.service(),

    attributeBindings: ['style'],
    style: Ember.computed('layout', function () {
        const url = this.get('layout.img-url') ? `url(${this.get('layout.img-url')})` : 'url(\'/img/splash-default.jpg\')';
        const height = this.get('layout.height') ? `${this.get('layout.height')}px` : '300px';
        return `background: ${url} no-repeat left center; ` +
            'background-size: cover; ' +
            `height: ${height};`;
    })

});
