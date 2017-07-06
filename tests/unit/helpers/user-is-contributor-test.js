import { userIsContributor } from 'collections/helpers/user-is-contributor';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | user is contributor');

test('Returns true if user is a contributor', function(assert) {
    const user = Ember.Object.create({
        id: '12345',
    });
    const contributors = [Ember.Object.create({
        userId: '12345',
    })];
    const result = userIsContributor([user, contributors]);
    assert.equal(result, true);
});


test('Returns false if user is not a contributor', function(assert) {
    const user = Ember.Object.create({
        id: '12345',
    });
    const contributors = [Ember.Object.create({
        userId: 'abcde',
    })];
    const result = userIsContributor([user, contributors]);
    assert.equal(result, false);
});
