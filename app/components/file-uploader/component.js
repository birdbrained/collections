import Ember from 'ember';
// import ENV from 'analytics-dashboard/config/environment';

export default Ember.Component.extend({


    didRender() {
        console.log('hello')
        debugger;
    },

    actions: {

        uploadFile(ev) {
            const reader = new FileReader();
            const fileHandle = ev.target.files[0];
            const saveParameter = this.attrs.saveParameter;
            const filenameParts = ev.currentTarget.value.split('\\');
            const filename = filenameParts[filenameParts.length - 1];
            const parameters = this.attrs.widget.value.parameters;

            reader.onloadend = function(ev) {
                this.set('widget.parameter', {
                    fileName: filename,
                    fileData: ev.target.result
                });
            };

            reader.readAsBinaryString(fileHandle);
        },
    },

});
