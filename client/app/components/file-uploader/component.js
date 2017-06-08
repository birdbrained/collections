import Ember from 'ember';
//import ENV from 'analytics-dashboard/config/environment';

export default Ember.Component.extend({

    actions: {

        uploadFile: function(ev) {

            const READER = new FileReader();
            const FILE_HANDLE = ev.target.files[0];
            const SAVE_PARAMETER = this.attrs.saveParameter
            const FILENAME_PARTS = ev.currentTarget.value.split('\\')
            const FILENAME = FILENAME_PARTS[FILENAME_PARTS.length - 1];
            const PARAMETERS = this.attrs.widget.value.parameters;

            SAVE_PARAMETER(PARAMETERS.fileName, {
                value: FILENAME,
                state: ['defined']
            });

            READER.onloadend = function(ev) {
                SAVE_PARAMETER(PARAMETERS.fileData, {
                    value: ev.target.result,
                    state: ['defined']
                });
            };

            READER.readAsBinaryString(FILE_HANDLE);

        }
    }

});
