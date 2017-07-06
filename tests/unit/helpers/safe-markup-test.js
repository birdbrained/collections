import { safeMarkup } from 'collections/helpers/safe-markup';
import { moduleFor, test } from 'ember-qunit';

moduleFor('helper:safe-markup', 'Unit | Helper | safe markup', {
});

test('marks string as safe for unescaped output', function(assert) {
    const result = safeMarkup(['<div>myString</div>']);
    assert.equal(result.toString(), '<div>myString</div>');
});
