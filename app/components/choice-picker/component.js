import Ember from 'ember';


export default Ember.Component.extend({

    caxe: Ember.inject.service(),
    store: Ember.inject.service(),

    choiceObserver: Ember.observer('chosen', function() {

        Ember.run(async () => {

            let chosen = this.get('chosen');
            let chosenParameter = await this.get('store').queryRecord('parameter', {
                name: chosen
            });

            this.get('widget.parameters.choices.value').map(async (choiceName) => {

                let choice = await this.get('store').queryRecord('parameter', {
                    name: choiceName.parameter
                });

                if (!choice) {
                    choice = this.get('store').createRecord('parameter');
                    let caxe = await this.get('store').findRecord('case', this.get('caxe.activeCase.id'));
                    choice.set('case', caxe);
                    let wf = await caxe.get('workflow')
                    choice.set('workflow', wf);
                    choice.set('name', choiceName.parameter);
                }

                choice.set('value', choiceName.parameter === chosen);
                await choice.save();

            });

        })

    })

});

