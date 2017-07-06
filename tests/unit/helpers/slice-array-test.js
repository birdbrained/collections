
import { sliceArray } from 'collections/helpers/slice-array';
import { module, test } from 'qunit';

module('Unit | Helper | slice array');

// Replace this with your real tests.
test('it works', function(assert) {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const start = 3;
    const finish = 6;
    const result = sliceArray([array, start, finish]);
    assert.ok(result[1] === array.slice(start, finish)[1]);
});

