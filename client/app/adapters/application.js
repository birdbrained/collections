import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'http://127.0.0.1:8000',
    namespace: 'api',
    headers :{
        'Authorization' : 'Basic YWRtaW46YWRtaW4yMjkwMw=='
    }
});
