import Ember from 'ember';


export default Ember.Route.extend({
    panelActions: Ember.inject.service('panelActions'),
    model() {
        return {
            submission_form_name: 'Preprints Submission Form',
            sections: [
              {name: 'upload', divId: 'preprint-form-upload', param: 'upload_section'},
              {name: 'disciplines', divId: 'preprint-form-subjects', param: 'disciplines_section'},
              {name: 'basic info', divId: 'preprint-form-basics', param: 'basic_info_section'},
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
                disciplines_section: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
                    showValidationIndicator: true,
                    value: undefined
                },
                basic_info_section: {
                    state: ['disabled'],
                    allowOpen: true,
                    open: false,
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
                preprint_file_url: {
                    state: ['undefined'],
                    value: undefined
                },
                save_upload_section_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                subject_picker_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                basic_info_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                authors_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                file_url_missing_notice: {
                    state: ['undefined'],
                    value: undefined
                },
                edit_upload_section_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                save_authors_section_widget: {
                    state: ['undefined'],
                    value: undefined
                },
                submit_button_widget: {
                    state: ['undefined'],
                    value: undefined
                }
            },
            initial_widgets: [],
            actions: [{
                id: '2bf24381-75f5-4e73-aa6e-ec25b3300600',
                type: 'create_widget',
                args: {
                    widget_component: 'file-uploader',
                    description: 'Choose the preprint file to upload',
                    section: 'upload',
                },
                parameters: {
                    fileName: 'preprint_file_name',
                    fileData: 'preprint_file_data',
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
                id: 'c6e5a8ff-e1e9-49fe-8ee4-7d12d2fb56dd',
                type: 'create_widget',
                args: {
                    widget_component: 'text-field',
                    description: 'Enter the title for this preprint',
                    section: 'upload',
                },
                parameters: {
                    output: 'preprint_file_name'
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
                id: '99e941be-3fae-41d7-b481-89764a1561b6',
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    description: 'Edit this section',
                    section: 'upload',
                    css_classes: ['section-submit-button'],
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
                id: '5d46c582-7335-43cc-bf15-fb30ba52a39c',
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    description: 'Save this section',
                    section: 'upload',
                    css_classes: ['section-submit-button'],
                    action_id: '5db3456b-cef7-4c87-bb60-16a04ee89bad'
                },
                parameters: {
                    parameter: 'preprint_file_url',
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
                    widget_object: 'save_upload_section_widget'
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
                type: 'create_widget',
                args: {
                    widget_component: 'subject-picker',
                    description: 'Save this section',
                    section: 'disciplines',
                    action_id: 'a11388e0-c3b2-488a-a100-60de46172adf'
                },
                parameters: {
                    subjects: 'selected_subjects'
                },
                output_parameter: 'subject_picker_widget',
                conditions: [{
                    all: [{
                        parameter: 'subject_picker_widget',
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
                type: 'create_widget',
                args: {
                    widget_component: 'preprint-basics',
                    description: 'License and other things',
                    section: 'basic info',
                    action_id: '886cde3c-9e25-4950-b02f-832fad8923cc'
                },
                parameters: {
                    basicInfo: 'basic_info'
                },
                output_parameter: 'basic_info_widget',
                conditions: [{
                    all: [{
                        parameter: 'basic_info_widget',
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
                type: 'create_widget',
                args: {
                    widget_component: 'paragraph-display',
                    description: 'The preprint\'s file has not yet been uploaded.',
                    section: 'submit'
                },
                parameters: {
                    output_parameter: 'null'
                },
                output_parameter: 'file_url_missing_notice',
                conditions: [{
                    all: [{
                        parameter: 'file_url_missing_notice',
                        state: 'undefined',
                    }, {
                        parameter: 'preprint_file_url',
                        state: 'undefined'
                    }]
                }]
            }, {
                id: 'a91f560f-b8c1-4087-be3b-3490c2861f24',
                type: 'create_widget',
                args: {
                    widget_component: 'preprint-form-authors',
                    description: 'Add and manage authors',
                    section: 'authors'
                },
                parameters: {
                    authors_list: 'authors_list'
                },
                output_parameter: 'authors_widget',
                conditions: [{
                    all: [{
                        parameter: 'authors_widget',
                        state: 'undefined',
                    }],
                }]
            }, {
                id: '7231cc6f-b861-439e-a628-a01fe0a20587',
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    css_classes: ['section-submit-button'],
                    description: 'Save this section',
                    section: 'authors',
                    action_id: '60d11fd0-c2da-4fdd-9d08-0310aa17a3e4'
                },
                parameters: {
                    output_parameter: 'authors_section',
                },
                output_parameter: 'save_authors_section_widget',
                conditions: [{
                    all: [{
                        parameter: 'save_authors_section_widget',
                        state: 'undefined',
                    }, {
                        parameter: 'authors_section',
                        state: 'editing'
                    }],
                }]
            }, {
                id: '60d11fd0-c2da-4fdd-9d08-0310aa17a3e4',
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    description: 'Edit this section',
                    css_classes: ['section-submit-button'],
                    section: 'authors',
                    action_id: '0dcc508a-9946-437a-a0b2-73c7f88aa2fe'
                },
                parameters: {
                    output_parameter: 'authors_section',
                },
                output_parameter: 'edit_authors_section_widget',
                then: '3f5d1d8e-a01c-4c22-bbba-c7d5ad385a88'
            }, {
                id: '3f5d1d8e-a01c-4c22-bbba-c7d5ad385a88',
                type: 'delete_widget',
                parameters: {
                    widget_object: 'save_authors_section_widget'
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
                type: 'delete_widget',
                parameters: {
                    widget_object: 'edit_authors_section_widget'
                },
                then: '7231cc6f-b861-439e-a628-a01fe0a20587'
            }, {
                id: '1d4bcab7-c454-450d-95c5-113d89121f89',
                type: 'create_widget',
                args: {
                    widget_component: 'button-widget',
                    section: 'submit',
                    description: 'Submit',
                    disabled: 'true',
                    css_classes: ['submit_button', 'btn-lg', 'btn-success'],
                    action_id: 'afa2e526-ea5f-47f7-a99d-459536e24fd1'
                },
                conditions: [{
                    all: [{
                        parameter: 'submit_button_widget',
                        state: 'undefined'
                    }]
                }],
                output_parameter: 'submit_button_widget'
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
                    updated_parameter: {
                        state: ['enabled']
                    }
                },
                parameters: {
                    parameter: 'submit_button'
                },
                conditions: [{
                    all: [{
                        parameter: 'preprint_file_data',
                        state: 'defined',
                    }, {
                        parameter: 'submit_button',
                        state: 'disabled'
                    }, {
                        parameter: 'preprint_file_url',
                        state: 'defined'
                    }, {
                        parameter: 'selected_subjects',
                        state: 'defined',
                    }, {
                        parameter: 'basic_info',
                        state: 'defined'
                    }, {
                        parameter: 'authors_list',
                        state: 'defined'
                    }]
                }],
                output_parameter: 'null',
                then: '60edeef7-189c-4189-b44a-157b79ce88ef'
            }, {
                id: '60edeef7-189c-4189-b44a-157b79ce88ef',
                type: 'enableWidget',
                parameters: {
                    widget_object: 'submit_button_widget'
                },
            }]
        };
    },

    setupController(controller, model) {

        // Set up state defined on the model.
        controller.set('sections', model.sections);
        controller.set('parameters', model.initial_parameters);

        // Hydrate actions in preperation for engine ignition
        const actions = model.actions.map(controller.hydrate_action.bind(controller));
        controller.set('formActions', actions);

        // Start the engine.
        controller.updateState.call(controller, actions);

    }

});
