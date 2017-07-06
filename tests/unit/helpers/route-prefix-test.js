
import { routePrefix } from 'collections/helpers/route-prefix';
import { moduleFor, test } from 'ember-qunit';

moduleFor('helper:route-prefix', 'Unit | Helper | route prefix', {
    needs: [
        'service:theme',
    ],
});

// Replace this with your real tests.
test('no provider has no prefix', function(assert) {
    const result = routePrefix(['a', 'b', 'c']);
    assert.ok(result === 'abc');
});

