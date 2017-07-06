import { moduleForModel, test } from 'ember-qunit';

moduleForModel('item', 'Unit | Model | item', {
    // Specify the other units that are required for this test.
    needs: [
        'model:collection',
        'model:group',
        'model:user',
    ],
});

test('it exists', function(assert) {
    const model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
});
