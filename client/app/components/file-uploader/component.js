import Ember from 'ember';
//import ENV from 'analytics-dashboard/config/environment';

export default Ember.Component.extend({

    actions: {

        uploadFile: function(ev) {

            const reader = new FileReader();
            const fileHandle = ev.target.files[0];
            const saveParameter = this.attrs.saveParameter
            const filenameParts = ev.currentTarget.value.split('\\')
            const filename = filenameParts[filenameParts.length - 1];
            const parameters = this.attrs.widget.value.parameters;

            saveParameter(parameters.fileName, {
                value: filename,
                state: ['defined']
            });

            reader.onloadend = function(ev) {
                saveParameter(parameters.fileData, {
                    value: ev.target.result,
                    state: ['defined']
                });
            };

            reader.readAsBinaryString(fileHandle);

        }
    }

});
