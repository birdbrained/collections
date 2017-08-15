import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return
Router.map(function() {
    this.route('index', { path: '/' });
    this.route('meetings'); // home page
    this.route('collection', { path: 'collection/:collection_id' }, function() {
        this.route('item', { path: 'item/:item_id' });
        this.route('group', { path: 'group/:group_id' }, function() {
            this.route('item', { path: 'item/:group_item_id' });
        });
        this.route('add');
        this.route('search');
        this.route('browse');
        this.route('edit');
    });
    this.route('create');
    this.route('not-found', { path: '/*path' });
    this.route('create_meeting');
});

export default Router;
