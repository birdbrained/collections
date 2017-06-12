import DS from 'ember-data';


export default DS.JSONSerializer.extend({

    isSuccess: function(status, headers, payload) {
        return status >= 200 && status < 300 || status === 304;
    }

});
