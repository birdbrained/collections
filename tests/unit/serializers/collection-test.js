import { moduleForModel, test } from 'ember-qunit';

moduleForModel('collection', 'Unit | Serializer | collection', {
    // Specify the other units that are required for this test.
    needs: [
        'serializer:collection',
        'serializer:application',
        'model:user',
        'model:group',
        'model:item',
    ],
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
    const record = this.subject();

    const serializedRecord = record.serialize();

    assert.ok(serializedRecord);
});
