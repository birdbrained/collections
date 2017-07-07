import DS from 'ember-data';

const { JSONSerializer } = DS;

export default JSONSerializer.extend({
    isSuccess(status) {
        if (status >= 200 && status < 300) return true;
        if (status === 304) return true;
        return false;
    },
});
