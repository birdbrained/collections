import DS from 'ember-data';

const { JSONSerializer } = DS;

export default JSONSerializer.extend({

    normalizeFindRecordResponse(store, type, payload, response) {

        let included = [];

        function normalizeRelationship(type, v, i, arr) {
            
            included = included.concat({
                id: v.id,
                attributes: v,
            });
            return {
                id: v.id,
                type: type,
            };
        }

        const jsonapiDocument = {
            data: {
                id: payload.id,
                type: 'workflow',
                attributes: {
                    label: payload.label,
                    description: payload.description,
                },
                relationships: {
                    sections: payload.sections
                        .map(section => section.widgets
                            .map(normalizeRelationship.bind(this, 'widget')))
                        .map(normalizeRelationship.bind(this, 'section')),
                },
            },
        };

        jsonapiDocument.included = included;

        debugger;

        return jsonapiDocument;
    },

    isSuccess(status) {
        if (status >= 200 && status < 300) return true;
        if (status === 304) return true;
        return false;
    },
});
