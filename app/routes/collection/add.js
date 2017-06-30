import Ember from 'ember';


export default Ember.Route.extend({
    panelActions: Ember.inject.service('panelActions'),
    model() {
        let collectionSettings = this.modelFor('collection').get('settings');
        let collectionType = JSON.parse(collectionSettings).collectionType;
        let preprintForm = {
            submissionFormType: collectionType,
            submission_form_name: 'Preprints Submission Form',
            sections: [
              {name: 'upload', divId: 'preprint-form-upload', param: 'uploadSection'},
              {name: 'disciplines', divId: 'preprint-form-subjects', param: 'disciplinesSection'},
              {name: 'basic info', divId: 'preprint-form-basics', param: 'basicInfoSection'},
              {name: 'authors', divId: 'preprint-form-authors', param: 'authorsSection'},
              {name: 'submit', divId: 'preprint-form-submit', param: 'submitVutton'}
            ],
            initialParameters: {
                uploadSection: {
                    state: ['unsaved', 'editing'],
                    allowOpen: true,
                    open: true,
                    showValidationIndicator: true,
                    value: undefined,
                    isSectionSaved: false
                },
                disciplinesSection: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: true,
                    value: undefined,
                    isSectionSaved: false
                },
                basicInfoSection: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: true,
                    value: undefined,
                    isSectionSaved: false
                },
                authorsSection: {
                    state:  ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: true,
                    value: undefined,
                    isSectionSaved: false
                },
                submitButton: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: false,
                    value: undefined,
                    isSectionSaved: false
                },
                preprintFileUploadWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                preprintTitleWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                preprintFileUrl: {
                    state: ['undefined'],
                    value: undefined
                },
                saveUploadSectionWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                subjectPickerWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                basicInfoWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                authorsWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                fileUrlMissingNotice: {
                    state: ['undefined'],
                    value: undefined
                },
                editUploadSectionWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                saveAuthorsSectionWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                editAuthorsSectionWidget: {
                    state: ['undefined'],
                    value: undefined
                },
                submitButtonWidget: {
                    state: ['undefined'],
                    value: undefined
                }
            },
            initialWidgets: [],
            actions: [{
                id: '2bf24381-75f5-4e73-aa6e-ec25b3300600',
                type: 'createWidget',
                args: {
                    widgetComponent: 'file-uploader',
                    description: 'Choose the preprint file to upload',
                    section: 'upload',
                },
                parameters: {
                    fileName: 'preprintFileName',
                    fileData: 'preprintFileData',
                },
                outputParameter: 'preprintFileUploadWidget',
                conditions: [{
                    all: [{
                        parameter: 'uploadSection',
                        state: 'unsaved',
                    }, {
                        parameter: 'preprintFileUploadWidget',
                        state: 'undefined'
                    }]
                }]
            }, {
                id: 'c6e5a8ff-e1e9-49fe-8ee4-7d12d2fb56dd',
                type: 'createWidget',
                args: {
                    widgetComponent: 'text-field',
                    description: 'Enter the title for this preprint',
                    section: 'upload',
                },
                parameters: {
                    output: 'preprintFileName'
                },
                outputParameter: 'preprintTitleWidget',
                conditions: [{
                    all: [{
                        parameter: 'preprintTitleWidget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprintFileData',
                        state: 'defined',
                    }, {
                        parameter: 'uploadSection',
                        state: 'editing',
                    }],
                }]
            }, {
                id: '99e941be-3fae-41d7-b481-89764a1561b6',
                type: 'createWidget',
                args: {
                    widgetComponent: 'button-widget',
                    description: 'Edit this section',
                    section: 'upload',
                    cssClasses: ['section-submit-button'],
                    actionId: '28fe8c59-fab7-4a0c-8e7e-38a5176ae34d'
                },
                parameters: {
                    outputParameter: 'uploadSection',
                },
                outputParameter: 'editUploadSectionWidget',
                conditions: [{
                    all: [{
                        parameter: 'editUploadSectionWidget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprintFileData',
                        state: 'defined',
                    }, {
                        parameter: 'preprintFileName',
                        state: 'defined'
                    }, {
                        parameter: 'uploadSection',
                        state: 'closed',
                    }],
                }]
            }, {
                id: '28fe8c59-fab7-4a0c-8e7e-38a5176ae34d',
                type: 'saveParameter',
                args: {
                    updatedParameter: {
                        state: ['editing', 'saved']
                    }
                },
                parameters: {
                    parameter: 'uploadSection'
                }
            }, {
                id: '5d46c582-7335-43cc-bf15-fb30ba52a39c',
                type: 'createWidget',
                args: {
                    widgetComponent: 'button-widget',
                    description: 'Save and continue',
                    section: 'upload',
                    cssClasses: ['section-submit-button'],
                    actionId: '5db3456b-cef7-4c87-bb60-16a04ee89bad'
                },
                parameters: {
                    parameter: 'preprintFileUrl',
                },
                outputParameter: 'saveUploadSectionWidget',
                conditions: [{
                    all: [{
                        parameter: 'saveUploadSectionWidget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprintFileData',
                        state: 'defined',
                    }, {
                        parameter: 'preprintFileName',
                        state: 'defined'
                    }, {
                        parameter: 'uploadSection',
                        state: 'editing',
                    }],
                }]
            }, {
                id: '5db3456b-cef7-4c87-bb60-16a04ee89bad',
                type: 'uploadFile',
                parameters: {
                    fileData: 'preprintFileData',
                    fileName: 'preprintFileName',
                    node: 'preprintNode'
                },
                outputParameter: 'preprintFileUrl',
                then: 'cec150d6-0396-49a9-b6cb-8ab375b2d09e',
            }, {
                id: 'cec150d6-0396-49a9-b6cb-8ab375b2d09e',
                type: 'saveParameter',
                args: {
                    updatedParameter: {
                        state: ['closed', 'saved']
                    }
                },
                parameters: {
                    parameter: 'uploadSection'
                },
                then: 'cdefb5db-2486-4466-8c1c-5d24ffd7e6ab'
            }, {
                id: 'cdefb5db-2486-4466-8c1c-5d24ffd7e6ab',
                type: 'closeSection',
                args: {
                    sectionName: 'upload'
                },
                then: '7fb38183-d1f2-41a2-aef5-1bc99743762e'
            }, {
                id: '7fb38183-d1f2-41a2-aef5-1bc99743762e',
                type: 'disableWidget',
                parameters: {
                    widgetObject: 'saveUploadSectionWidget'
                },
                then: '6606b697-9a53-4fc7-aab6-898a2904c579'
            }, {
                id: '6606b697-9a53-4fc7-aab6-898a2904c579',
                type: 'openSection',
                args: {
                    sectionName: 'disciplines'
                }
            }, {
                id: '2726a848-6240-4e24-8492-6aab673f1f6d',
                type: 'createWidget',
                args: {
                    widgetComponent: 'subject-picker',
                    description: 'Save this section',
                    section: 'disciplines',
                    actionId: 'a11388e0-c3b2-488a-a100-60de46172adf'
                },
                parameters: {
                    subjects: 'selectedSubjects'
                },
                outputParameter: 'subjectPickerWidget',
                conditions: [{
                    all: [{
                        parameter: 'subjectPickerWidget',
                        state: 'undefined'
                    }]
                }]
            }, {
                id: 'a11388e0-c3b2-488a-a100-60de46172adf',
                type: 'openSection',
                args: {
                    sectionName: 'basic info'
                },
                then: '39cb9157-617e-404a-ac1d-77e9d273b478'
            }, {
                id: '39cb9157-617e-404a-ac1d-77e9d273b478',
                type: 'closeSection',
                args: {
                    sectionName: 'disciplines'
                },
            }, {
                id: '9ac6cdb6-1ae4-47ad-b25b-7f7f8d627265',
                type: 'createWidget',
                args: {
                    widgetComponent: 'preprint-basics',
                    description: 'License and other things',
                    section: 'basic info',
                    actionId: '886cde3c-9e25-4950-b02f-832fad8923cc'
                },
                parameters: {
                    basicInfo: 'basicInfo'
                },
                outputParameter: 'basicInfoWidget',
                conditions: [{
                    all: [{
                        parameter: 'basicInfoWidget',
                        state: 'undefined'
                    }]
                }]
            }, {
                id: '886cde3c-9e25-4950-b02f-832fad8923cc',
                type: 'closeSection',
                args: {
                    sectionName: 'basic info'
                },
                then: '1eaae481-1a80-4dfe-9c12-1a7f7383c1a7'
            }, {
                id: '1eaae481-1a80-4dfe-9c12-1a7f7383c1a7',
                type: 'openSection',
                args: {
                    sectionName: 'authors'
                }
            }, {
                id: 'd82139b4-4975-4410-92d1-ab0dee02b4e8',
                type: 'createWidget',
                args: {
                    widgetComponent: 'paragraph-display',
                    description: 'The preprint\'s file has not yet been uploaded.',
                    section: 'submit'
                },
                parameters: {
                    outputParameter: 'null'
                },
                outputParameter: 'fileUrlMissingNotice',
                conditions: [{
                    all: [{
                        parameter: 'fileUrlMissingNotice',
                        state: 'undefined',
                    }, {
                        parameter: 'preprintFileUrl',
                        state: 'undefined'
                    }]
                }]
            }, {
                id: 'a91f560f-b8c1-4087-be3b-3490c2861f24',
                type: 'createWidget',
                args: {
                    widgetComponent: 'preprint-form-authors',
                    description: 'Add and manage authors',
                    section: 'authors'
                },
                parameters: {
                    authorsList: 'authorsList'
                },
                outputParameter: 'authorsWidget',
                conditions: [{
                    all: [{
                        parameter: 'authorsWidget',
                        state: 'undefined',
                    }],
                }]
            }, {
                id: '7231cc6f-b861-439e-a628-a01fe0a20587',
                type: 'createWidget',
                args: {
                    widgetComponent: 'button-widget',
                    cssClasses: ['section-submit-button'],
                    description: 'Save and continue',
                    section: 'authors',
                    actionId: '60d11fd0-c2da-4fdd-9d08-0310aa17a3e4'
                },
                parameters: {
                    parameter: 'authorsSection',
                },
                outputParameter: 'saveAuthorsSectionWidget',
                conditions: [{
                    all: [{
                        parameter: 'saveAuthorsSectionWidget',
                        state: 'undefined',
                    }, {
                        parameter: 'authorsSection',
                        state: 'editing'
                    }],
                }]
            }, {
                id: '60d11fd0-c2da-4fdd-9d08-0310aa17a3e4',
                type: 'createWidget',
                args: {
                    widgetComponent: 'button-widget',
                    description: 'Edit this section',
                    cssClasses: ['section-submit-button'],
                    section: 'authors',
                    actionId: '0dcc508a-9946-437a-a0b2-73c7f88aa2fe'
                },
                parameters: {
                    parameter: 'authorsSection',
                },
                outputParameter: 'editAuthorsSectionWidget',
                then: '3f5d1d8e-a01c-4c22-bbba-c7d5ad385a88'
            }, {
                id: '3f5d1d8e-a01c-4c22-bbba-c7d5ad385a88',
                type: 'deleteWidget',
                parameters: {
                    widgetObject: 'saveAuthorsSectionWidget'
                },
                then: '18db45c2-029e-4c0a-b662-69a6a14d3d3d'
            }, {
                id: '18db45c2-029e-4c0a-b662-69a6a14d3d3d',
                type: 'closeSection',
                args: {
                    sectionName: 'authors'
                }
            }, {
                id: '0dcc508a-9946-437a-a0b2-73c7f88aa2fe',
                type: 'openSection',
                args: {
                    sectionName: 'authors'
                },
                then: '1cf0323c-72c5-4344-b238-f3d8c5bd7b63'
            }, {
                id: '1cf0323c-72c5-4344-b238-f3d8c5bd7b63',
                type: 'deleteWidget',
                parameters: {
                    widgetObject: 'editAuthorsSectionWidget'
                },
                then: '7231cc6f-b861-439e-a628-a01fe0a20587'
            }, {
                id: '1d4bcab7-c454-450d-95c5-113d89121f89',
                type: 'createWidget',
                args: {
                    widgetComponent: 'button-widget',
                    section: 'submit',
                    description: 'Submit',
                    disabled: 'true',
                    cssClasses: ['submit_button', 'btn-lg', 'btn-success'],
                    actionId: 'afa2e526-ea5f-47f7-a99d-459536e24fd1'
                },
                conditions: [{
                    all: [{
                        parameter: 'submitButtonWidget',
                        state: 'undefined'
                    }]
                }],
                outputParameter: 'submitButtonWidget'
            }, {
                id: 'afa2e526-ea5f-47f7-a99d-459536e24fd1',
                type: 'browserAlert',
                args: {
                    alertString: 'FORM SUBMITTTED'
                }
            }, {
                id: 'a58fcc41-ed0c-43ab-a765-d83cb36f6a9b',
                type: 'saveParameter',
                args: {
                    updatedParameter: {
                        state: ['enabled']
                    }
                },
                parameters: {
                    parameter: 'submitButton'
                },
                conditions: [{
                    all: [{
                        parameter: 'preprintFileData',
                        state: 'defined',
                    }, {
                        parameter: 'submitButton',
                        state: 'disabled'
                    }, {
                        parameter: 'preprintFileUrl',
                        state: 'defined'
                    }, {
                        parameter: 'selectedSubjects',
                        state: 'defined',
                    }, {
                        parameter: 'basicInfo',
                        state: 'defined'
                    }, {
                        parameter: 'authorsList',
                        state: 'defined'
                    }]
                }],
                outputParameter: 'null',
                then: '60edeef7-189c-4189-b44a-157b79ce88ef'
            }, {
                id: '60edeef7-189c-4189-b44a-157b79ce88ef',
                type: 'enableWidget',
                parameters: {
                    widgetObject: 'submitButtonWidget'
                },
            }]
        };
        let meetingForm = {
            submissionFormType: collectionType,
            submission_form_name: 'Meeting Submission Form',
            sections: [
              {name: 'upload', divId: 'preprint-form-upload', param: 'upload_section'},
              {name: 'authors', divId: 'preprint-form-authors', param: 'authors_section'},
              {name: 'submit', divId: 'preprint-form-submit', param: 'submit_button'}
            ],
            initial_parameters: {
                upload_section: {
                    state: ['unsaved', 'editing'],
                    allowOpen: true,
                    open: true,
                    showValidationIndicator: true,
                    value: undefined
                },
                authors_section: {
                    state:  ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: true,
                    value: undefined
                },
                submit_button: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: false,
                    value: undefined
                },
                preprint_file_upload_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                preprint_title_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                save_upload_section_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                authors_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                edit_upload_section_widget: {
                    state: ['undefined'],
                    value: undefined
                }
            },
            initial_widgets: [],
            actions: [{
                type: 'create_widget',
                args: {
                    widget_component: 'file-uploader',
                    description: 'Choose the preprint file to upload',
                    section: 'upload',
                },
                parameters: {
                    output_parameter: 'preprint_file_data'
                },
                output_parameter: 'preprint_file_upload_widget',
                conditions: [{
                    all: [{
                        parameter: 'upload_section',
                        state: 'unsaved',
                    }, {
                        parameter: 'preprint_file_upload_widget',
                        state: 'undefined'
                    }]
                }]
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'text-field',
                    description: 'Enter the title for this meeting.',
                    section: 'upload',
                },
                parameters: {
                    output_parameter: 'preprint_file_name'
                },
                output_parameter: 'preprint_title_widget',
                conditions: [{
                    all: [{
                        parameter: 'preprint_title_widget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprint_file_data',
                        state: 'defined',
                    }, {
                        parameter: 'upload_section',
                        state: 'editing',
                    }],
                }]
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    description: 'Edit this section',
                    section: 'upload',
                    action_id: '28fe8c59-fab7-4a0c-8e7e-38a5176ae34d'
                },
                parameters: {
                    output_parameter: 'upload_section',
                },
                output_parameter: 'edit_upload_section_widget',
                conditions: [{
                    all: [{
                        parameter: 'edit_upload_section_widget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprint_file_data',
                        state: 'defined',
                    }, {
                        parameter: 'preprint_file_name',
                        state: 'defined'
                    }, {
                        parameter: 'upload_section',
                        state: 'closed',
                    }],
                }]
            }, {
                id: '28fe8c59-fab7-4a0c-8e7e-38a5176ae34d',
                type: 'saveParameter',
                args: {
                    updated_parameter: {
                        state: ['editing', 'saved']
                    }
                },
                parameters: {
                    parameter: 'upload_section'
                }
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    description: 'Save this section',
                    section: 'upload',
                    action_id: '5db3456b-cef7-4c87-bb60-16a04ee89bad'
                },
                parameters: {
                    output_parameter: 'preprint_file_url',
                },
                output_parameter: 'save_upload_section_widget',
                conditions: [{
                    all: [{
                        parameter: 'save_upload_section_widget',
                        state: 'undefined',
                    }, {
                        parameter: 'preprint_file_data',
                        state: 'defined',
                    }, {
                        parameter: 'preprint_file_name',
                        state: 'defined'
                    }, {
                        parameter: 'upload_section',
                        state: 'editing',
                    }],
                }]
            }, {
                id: '5db3456b-cef7-4c87-bb60-16a04ee89bad',
                type: 'upload_file',
                parameters: {
                    file_data: 'preprint_file_data',
                    file_name: 'preprint_file_name',
                    node: 'preprint_node'
                },
                output_parameter: 'preprint_file_url',
                then: 'cec150d6-0396-49a9-b6cb-8ab375b2d09e',
            }, {
                id: 'cec150d6-0396-49a9-b6cb-8ab375b2d09e',
                type: 'saveParameter',
                args: {
                    updated_parameter: {
                        state: ['closed', 'saved']
                    }
                },
                parameters: {
                    parameter: 'upload_section'
                }
            }, {
                type: 'delete_widget',
                parameters: {
                    widget_object: 'save_upload_section_widget'
                },
                output_parameter: 'null',
                conitions: [{
                    all: [{
                        parameter: 'upload_section',
                        state: 'saved',
                    }]
                }]
            }, {
                type: 'delete_widget',
                parameters: {
                    widget_object: 'save_upload_section_widget'
                },
                output_parameter: 'null',
                conditions: [{
                    all: [{
                        parameter: 'preprint_file_url',
                        state: 'defined'
                    }]
                }]
            }, {
                type: 'create_widget',
                args: {
                    widget_component: 'preprint-form-authors',
                    description: 'Add and manage authors',
                    section: 'authors'
                },
                parameters: {
                    output_parameter: 'authors_list'
                },
                output_parameter: 'authors_widget',
                conditions: [{
                    all: [{
                        parameter: 'authors_widget',
                        state: 'undefined',
                    }
                    ],
                }]
            }]

        };
        debugger;
        if (collectionType === 'Preprint') {
            return preprintForm;
        } else if (collectionType === 'Meeting') {
            return meetingForm;
        }
    },

    setupController(controller, model) {
        // Set up state defined on the model.
        controller.set('model', model);
        controller.set('sections', model.sections);
        controller.set('parameters', model.initialParameters);

        // Hydrate actions in preperation for engine ignition
        const actions = model.actions.map(controller.hydrateAction.bind(controller));
        controller.set('formActions', actions);

        // Start the engine.
        controller.updateState.call(controller, actions);

    }

});
