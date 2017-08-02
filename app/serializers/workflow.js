import Ember from 'ember';
import DS from 'ember-data';
import Workflow from 'collections/models/workflow';

const { JSONAPISerializer } = DS;


function normalizeRelationships(store, type, rawRecord, JSONAPIDocument) {

    let attributes = {};
    type.eachAttribute((attributeName, attributeMeta) => {
        attributes[attributeName] = rawRecord[attributeName];
    });

    const normalizedRecord = {
        id: rawRecord.id,
        attributes: attributes,
        type: type.modelName,
        relationships: {},
    };

    type.eachRelationship(normalizeRelationship.bind(this, store, JSONAPIDocument, rawRecord, normalizedRecord));

    return normalizedRecord;

}

function normalizeRelationship(store, JSONAPIDocument, rawRecord, normalizedRecord, childKey, childRelationshipMeta) {

    if (typeof rawRecord[childKey] === 'undefined') return;
    normalizedRecord.relationships[childRelationshipMeta.key] = {
        data: { // Side effect here
            'hasMany': normalizeRecords,
            'hashMany': normalizeRecordsHash,
            'belongsTo': normalizeRecord
        }[childRelationshipMeta.kind](store, JSONAPIDocument, childRelationshipMeta, rawRecord[childKey]),
    };
    debugger;

}

function normalizeRecord(store, JSONAPIDocument, childRelationshipMeta, childRecord) {

    let recordId = childRecord.id;
    console.log(childRecord);
    if (typeof childRecord !== 'object') {
        recordId = childRecord;
        childRecord = {
            id: recordId
        };
    }
    console.log(childRecord);

    JSONAPIDocument.included.push( // Side effect here
        normalizeRelationships( // `normalizeRelationships` is called recursively
            store,
            store.modelFor(childRelationshipMeta.type),
            childRecord,
            JSONAPIDocument
        )
    );
    return {
        id: childRecord.id,
        type: childRelationshipMeta.type,
    };

}

function normalizeRecords(store, JSONAPIDocument, childRelationshipMeta, childRecords) {
    return childRecords.map((record) => normalizeRecord(store, JSONAPIDocument, childRelationshipMeta, record));
}

function normalizeRecordsHash(store, JSONAPIDocument, childRelationshipMeta, childRecords) {
    let children = {};
    Object.keys(childRecords).map((key) => {
        children[key] = normalizeRecord(store, JSONAPIDocument, childRelationshipMeta, childRecords[key]);
    });
    return children
}


export default JSONAPISerializer.extend({

    normalizeResponse(store, type, payload, id, requestType) {

        const JSONAPIDocument = {
            included: [],
        };

        JSONAPIDocument.data = normalizeRelationships(store, type, payload, JSONAPIDocument)
        console.log(JSONAPIDocument);
        return JSONAPIDocument;

    },

    isSuccess(status) {
        if (status >= 200 && status < 300) return true;
        if (status === 304) return true;
        return false;
    },

});




/*import Ember from 'ember';
import DS from 'ember-data';
import Workflow from 'collections/models/workflow';
import Store from 'collections/stores/application';

const { JSONSerializer } = DS;


function normalizeRelated(store, type, rawRecord, normalizedRecord) {
    type.eachRelationship((childKey, childRelationshipMeta) => {
        if (typeof rawRecord[childKey] === 'undefined') return;
        normalizedRecord.data.relationships[childRelationshipMeta.type] = { // Side effect here
            'hasMany': normalizeRelations,
            'belongsTo': normalizeRelation
        }[childRelationshipMeta.kind](store, childRelationshipMeta.type, rawRecord[childKey]);
    });
}

function normalizeRelation(parentRecord, childRecord) {
    parentRecord.relationships[childRecord.data.type]
    return {
        data: parentRecord.data,
        included: parentRecord.included
            .concat(childRecord.included)
            .concat(childRecord.data);
    }
}

function normalizeRecord(store, type, record) {

    let recordId = record.id;

    if (typeof record !== 'object') {
        recordId = record;
    }

    return normalizeRelated( // `normalizeRelated` is called recursively
        store,
        store.modelFor(type),
        record,
        {
            data: {
                id: childRecord.id,
                attributes: childRecord,
                type: type.modelName,
                relationships: {},
            },
            included: []
        },
    );

}

function normalizeRecords(store, type, records) {
    return childRecords.map((record) => normalizeRecord(store, type, records));
}


export default JSONSerializer.extend({

    normalizeResponse(store, type, payload, id, requestType) {
        return normalizeRecord(store, type, payload)
    },

    isSuccess(status) {
        if (status >= 200 && status < 300) return true;
        if (status === 304) return true;
        return false;
    },

});*/
