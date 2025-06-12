import * as lessonService from "../services/lesson.service.js";
import * as lessonSchema from "../schema/lesson.schema.js";
import * as viewDataProviderHelper from "./view-data-provider.helper.js";

// lessonEntitySchema: {
//   name: {
//     label: 'Titlul lecției',
//     type: 'string',
//     validationRules: [ [Object], [Object] ]
//   },
//   description: {
//     title: 'Descriere',
//     type: 'string',
//     validationRules: [ [Object], [Object] ]
//   }
// }
// const lessonEntitySchema = lessonSchema.entitySchema;

// lessonFormSchema: { formFields: [ { id: 'name' }, { id: 'description' } ] }
// const lessonFormSchema = lessonSchema.formSchema;

export const getReadVD = async (id) => {
    const lesson = await lessonService.getOneById(id);

    const data = { lesson };

    return data;
};

export const getFormData = async (id, validationErrors, entityInputData) => {
    const isEditMode = !!id;

    const entitySchema = lessonSchema.entitySchema;
    const formSchema = lessonSchema.formSchema;

    const formFields = viewDataProviderHelper.getFormFields(formSchema, entitySchema);

    if (validationErrors) {
        // In case of validation errors...
        formFields.name.value = entityInputData.name;
        formFields.description.value = entityInputData.description;

        Object.keys(formFields).forEach((key) => {
            const field = formFields[key];
            const fieldId = field.id;

            // 1. Send data back to the end user
            if (entityInputData && entityInputData[fieldId]) {
                field.value = entityInputData[fieldId];
            }

            // 2.Add validation message
            if (validationErrors && validationErrors[fieldId]) {
                field.hasError = true;
                field.message = validationErrors[fieldId];
            }
        });
    } else {
        // Otherwise, fill in the fields with data from DB
        if (isEditMode) {
            const entityData = await lessonService.getOneById(id);

            Object.keys(formFields).forEach((key) => {
                const field = formFields[key];
                const fieldId = field.id;

                if (entityData && entityData[fieldId]) {
                    field.value = entityData[fieldId];
                }
            });
        }
    }

    // Set focus
    const firstFieldWithError = Object.keys(formFields).find((key) => formFields[key].hasError) || Object.keys(formFields)[0]; // returns the first field if no match
    formFields[firstFieldWithError].hasFocus = true;

    const data = { isEditMode, formFields };
    return data;
};

export const getListVD = async () => {
    const lessons = await lessonService.getAll();
    const data = { lessons };

    return data;
};
