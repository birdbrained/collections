import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return
Router.map(function() {
    this.route('index', { path: '' });
    this.route('explore', {path: "explore"});
    this.route('meetings'); // home page
    this.route('my-content', {
        path: "my-content"
    });
    this.route('my-collection', {
        path: "my-collection"
    })
    this.route('collections', { path: 'collections'}, function() {
        this.route("collection", {path: ":collection_id" }, function() {
            this.route('item', { path: 'item/:item_id' });
            this.route('submissions');
            this.route('edit');
            this.route('add');
            this.route('group', { path: 'group/:group_id' }, function() {
                this.route('item', { path: 'item/:group_item_id' });
            });
        });
        this.route('search');
        this.route('browse');
    });
    this.route('appendices');
    this.route('create');
    this.route('not-found', { path: '/*path' });
    this.route('create_meeting');
});

export default Router;
