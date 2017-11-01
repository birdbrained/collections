import Ember from "ember";
import Compiler from 'npm:ember-source/dist/ember-template-compiler';

export default Ember.Component.extend({

    classNames: ["case-details"],
    parameters: {},
    store: Ember.inject.service(),
    router: Ember.inject.service('-routing'),

    caseDescriptionTemplate: Ember.computed(async function() {
        let refreshParameters = () => {
            this.get("store").findRecord("case", this.get("case.id"), {reload: true}).then(caxe => {
                this.set("parameters", this.get("case.parameters").reduce((parameters, parameter) => {
                    parameters[parameter.get("name")] = parameter.get("value");
                    return parameters;
                }, {}));
            });
        };
        refreshParameters();
        this.set("refreshParameters", setInterval(refreshParameters, 10000));
        let wf = await this.get("store").findRecord("workflow", this.get("case.workflow.id"), {reload: true});
        let templateName = "case-description-" + this.get("case.id");
        Ember.TEMPLATES[templateName] = Compiler.compile(wf.get("caseDescription"));
        return templateName
    }),

    willDestroyElement() {
        clearInterval(this.get("refreshParameters"));
    },

    actions: {
        continueCase(caxe, collection) {

            this.get("router").transitionTo('collections.collection.add', this.get("collection").id, this.get("case").id)

        }
    }

})