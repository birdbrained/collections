import Ember from 'ember';
import ENV from '../../config/environment';


function createCookie(name, value, days) {
    let expires;
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toGMTString()}`;
    } else expires = '';
    document.cookie = `${name}=${value}${expires}; path=/`;
}

function readCookie(name) { // eslint-disable-line no-unused-vars
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) { // eslint-disable-line no-unused-vars
    createCookie(name, '', -1);
}

function getToken() {
    let token;
    const session = window.localStorage['ember_simple_auth:session'];
    if (session) {
        token = JSON.parse(session).authenticated;
        if ('attributes' in token) {
            return token.attributes.accessToken;
        }
        return token;
    }
}

// Engine helper functions.
// ////////////////////////////////////////////////////////////////////////////////////////////////


function conditionDispatcher(condition) {
    const parameters = this.get('parameters');

    // Check if its a regular condition
    if (condition.parameter !== undefined) {
        // actualy check the condition is met;
        // the parameter has to have the given state.
        if (parameters[condition.parameter] === undefined) {
            parameters[condition.parameter] = {};
        }
        if (parameters[condition.parameter].state === undefined) {
            parameters[condition.parameter].state = [];
        }
        const parameterState = parameters[condition.parameter].state;
        // check that the state exists for this item
        return parameterState.some(stateItem => stateItem === condition.state);
    }

    // Check if its an 'all' composite condition
    if (condition.all !== undefined &&
        condition.all.constructor === Array
    ) {
        // if any conditions fail, the whole check fails.
        return checkAll.call(this, condition.all); // eslint-disable-line no-use-before-define
    }

    // Check if its an 'any' composite condition
    if (condition.any !== undefined &&
        condition.any.constructor === Array
    ) {
        // if any conditions are met, the whole check passes.
        return checkAny.call(this, condition.any); // eslint-disable-line no-use-before-define
    }

    // Check if its a 'none' composite condition
    if (condition.none !== undefined &&
        condition.none.constructor === Array
    ) {
        // if any conditions are met, the whole check fails.
        return !checkAny.call(this, condition.none); // eslint-disable-line no-use-before-define
    }

    return false;
}

function checkAll(conditions) {
    if (typeof conditions !== 'object') return false;
    if (conditions.constructor !== Array) return false;
    // if any conditions fail, the whole check fails.
    return !conditions.some(condition => !conditionDispatcher.call(this, condition));
}


function checkAny(conditions) {
    // If any conditions are met, the whole check passes.
    return conditions.some(conditionDispatcher.bind(this));
}


// Constructs an array containing the parameters or arguments that are used by an
// action function. Based on the action function's signature, which is an array of
// strings that describe how to map the parameters from their keys on the controller
// to the position in the function's arguments. This function constructs the array
// that the action function gets applied with
//
// Future improvements:
//
// - Pass in only the signature, args, and parameters objects to the function;
//   the function does not require the whole action object.

function constructArgArr(action) {
    const parameters = this.get('parameters');
    const args = action.signature.map((key) => {
        // Default to undefined.
        let value;

        // First try to use the parameter.
        if (typeof action.parameters === 'object' &&
            typeof action.parameters[key] === 'object'
        ) {
            const parameterKeys = Object.keys(parameters);

            // There was a bug here where the parameters weren't matching up right;
            // this check ensures parameters aren't duplicated and the like.
            parameterKeys.forEach((parameterKey) => {
                if (parameters[parameterKey] === action.parameters[key]) {
                    value = parameters[parameterKey];
                }
            });
        }

        if (typeof action.parameters === 'object' &&
            typeof action.parameters[key] === 'string'
        ) {
            if (typeof parameters[action.parameters[key]] !== 'object') {
                parameters[action.parameters[key]] = {};
            }

            value = parameters[action.parameters[key]];
        }

        // If an arg is defined, it takes priority.
        if (typeof action.args === 'object' &&
            action.args[key] !== undefined
        ) {
            value = action.args[key];
        }

        return value;
    });

    args.push(action.parameters);
    return args;
}


//

export default Ember.Controller.extend({

    panelActions: Ember.inject.service('panelActions'),

    editMode: false,
    methodSelected: false,
    addMethod: 'select', // 'select' or 'create'
    widgets: [],
    formActions: [],

    _names: Ember.computed('sections', function() {
        const sections = this.get('sections');
        return sections.map((section) => {
            return section.name;
        });
    }),

    //sxnz: Ember.observer('model.section', function() {
    //    debugger;
    //}),

    type: Ember.computed('model.settings', function() {
        const collectionType = this.get('model.settings.collectionType') || 'project';
        return collectionType.toLowerCase();
    }),

    actions: {

        updateProperty(oldValue, newValue) {
            this.set(oldValue, newValue);
            this.set('methodSelected', true); // Change view to show the methods
        },

        transition(name, id) {
            this.transitionToRoute(name, id);
        },


    },

    init () {
        this._super();
        this.set('content', Ember.Object.create({
            info: null,
        }));
        this.saveParameter = this.saveParameter.bind(this);
        this.closeSection = this.closeSection.bind(this);
        this.openSection = this.openSection.bind(this);
        this.createWidget = this.createWidget.bind(this);
        this.deleteWidget = this.deleteWidget.bind(this);
    },

    // Fire enabled actions.
    updateState(actions) {
        const controller = this;
        actions.forEach((action) => {
            // Check if the action can fire.
            if (!checkAll.call(this, action.conditions)) return;
            // Action may fire if execution has reached this point.
            // Call the action and set its result and any
            // changes to its state on `controller.parameters`.
            //
            async function fireActions(actionId) {
                if (typeof actionId === 'string') {
                    const actionObj = actions.find(action => action.id === actionId);
                    if (typeof actionObj.action === 'function') {
                        const result = await actionObj.action.apply(this, actionObj.argArr);
                        if (typeof actionObj.then === 'string') {
                            fireActions.call(this, actionObj.then);
                        }
                        actionObj.outputParameter.value = result;
                        actionObj.outputParameter.state = ['defined'];
                        controller.notifyPropertyChange('parameters');
                    }
                }
            }

            fireActions.call(this, action.id);
        });
    },


    // Take the description of an action and set its properties to be the vaious literal
    // functions and parameters it depends on to operate.
    hydrateAction(action) {
        const parameters = this.get('parameters');
        if (typeof parameters[action.outputParameter] !== 'object') {
            parameters[action.outputParameter] = {};
        }
        if (typeof action.parameters !== 'object') {
            action.parameters = {};
        }
        const signature = this.get(`${action.type}Signature`);
        // Create a new object as not to modify the object returned from the model
        const hydratedAction = {
            id: action.id,
            type: action.type,
            signature,
            action: this.get(action.type),
            conditions: action.conditions,
            parameters: Object.keys(action.parameters).reduce((result, key) => {
                if (typeof parameters[action.parameters[key]] !== 'object') {
                    parameters[action.parameters[key]] = {
                        state: ['undefined'],
                        value: undefined,
                    };
                }
                result[key] = parameters[action.parameters[key]];
                return result;
            }, {}),
            args: action.args,
            outputParameter: parameters[action.outputParameter],
            then: action.then,
        };
        hydratedAction.argArr = constructArgArr.call(this, hydratedAction);
        return hydratedAction;
    },


    createWidgetSignature: ['widgetComponent', 'description', 'disabled',
        'cssClasses', 'section', 'outputParameter', 'actionId'],
    // `this` must be bound to the controller for `create_widget`, as
    // `create_widget` requires access to the controller, and does so through `this`.
    createWidget(widgetComponent, description, disabled, cssClasses, section, outputParameter, actionId, parameters) {
        const controller = this;

        const actions = this.get('formActions');

        async function fireActions(actionId) {
            if (typeof actionId === 'string') {
                const actionObj = actions.find(action => action.id === actionId);
                if (typeof actionObj.action === 'function') {
                    const result = await actionObj.action.apply(this, actionObj.argArr);
                    if (typeof actionObj.then === 'string') {
                        fireActions.call(this, actionObj.then);
                    }
                    actionObj.outputParameter.value = result;
                    controller.notifyPropertyChange('parameters');
                    return result;
                }
            }
        }

        const action = context => fireActions.call(context, actionId);

        const widget = {
            widgetComponent,
            parameters,
            description,
            disabled,
            cssClasses,
            section,
            outputParameter,
            action,
        };
        this.get('widgets').pushObject(widget);
        return widget;
    },

    saveSection(section) {
        return function(widgets) {
            widgets.filter((widget) => {
                return widget.section === section;
            }).map((widget) => {
                return this[widget.output];
            });
        };
    },


    // Delete widget and resets state
    deleteWidgetSignature: ['widgetObject'], // eslint-disable-line ember/order-in-controllers
    deleteWidget(widgetObject) {
        this.get('widgets').removeObject(widgetObject.value);
        Ember.set(widgetObject, 'value', undefined);
        Ember.set(widgetObject, 'state', ['undefined']);
    },


    disableWidgetSignature: ['widgetObject'], // eslint-disable-line ember/order-in-controllers
    disableWidget(widgetObject) {
        Ember.set(widgetObject, 'value.disabled', true);
    },


    enableWidgetSignature: ['widgetObject'], // eslint-disable-line ember/order-in-controllers
    enableWidget(widgetObject) {
        Ember.set(widgetObject, 'value.disabled', false);
        Ember.run.next(this, function() {
            this.get('updateState').call(this, this.get('formActions'));
        });
    },


    toggleWidgetSignature: ['widgetObject'], // eslint-disable-line ember/order-in-controllers
    toggleWidget(widgetObject) {
        if (widgetObject.value.disabled === false) {
            Ember.set(widgetObject, 'value.disabled', true);
        } else {
            Ember.set(widgetObject, 'value.disabled', false);
        }
        Ember.run.next(this, function() {
            this.get('updateState').call(this, this.get('formActions'));
        });
    },


    uploadFileSignature: ['fileName', 'fileData', 'node'], // eslint-disable-line ember/order-in-controllers
    async uploadFile(fileName, fileData, node) {
        if (typeof fileName.value === 'undefined') return;
        if (typeof fileData.value === 'undefined') return;
        if (typeof node.value === 'undefined') node.value = ENV.NODE_GUID;
        const uri = `${ENV.OSF.waterbutlerUrl}v1/resources/${node.value
        }/providers/osfstorage/?kind=file&name=${fileName.value}`;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uri, true);
        xhr.withCredentials = false;
        xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);

        const deferred = Ember.RSVP.defer();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                deferred.resolve(JSON.parse(xhr.responseText).data.links.download);
            }
        };
        xhr.send(fileData.value);
        const value = await deferred.promise;
        return value;
    },


    saveParameterSignature: ['parameter', 'updatedParameter'], // eslint-disable-line ember/order-in-controllers
    saveParameter(parameter, updatedParameter) {
        if (typeof updatedParameter.value !== 'undefined') {
            Ember.set(parameter, 'value', updatedParameter.value);
        }
        if (typeof updatedParameter.state !== 'undefined') {
            Ember.set(parameter, 'state', updatedParameter.state);
        }
        Ember.run.next(this, function() {
            this.get('updateState').call(this, this.get('formActions'));
        });
    },


    closeSectionSignature: ['sectionName'], // eslint-disable-line ember/order-in-controllers
    closeSection(sectionName) {
        this.get('panelActions').close(this.get(`_names.${this.get('_names').indexOf(sectionName)}`));
        this.get('parameters')[this.get('sections').find(section => section.name === sectionName).param].state = ['closed', 'saved'];
        this.get('updateState').call(this, this.get('formActions'));
    },


    openSectionSignature: ['sectionName'], // eslint-disable-line ember/order-in-controllers
    openSection(sectionName) {
        this.get('panelActions').open(this.get(`_names.${this.get('_names').indexOf(sectionName)}`));
        this.get('parameters')[this.get('sections').find(section => section.name === sectionName).param].state = ['open', 'editing'];
    },


    browserAlertSignature: ['alertString'], // eslint-disable-line ember/order-in-controllers
    browserAlert(alertString) {
        this.toast.success(alertString);
    },


});
