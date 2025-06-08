import * as lessonService from "../services/lesson.service.js";
import * as lessonSchema from "../schema/lesson.schema.js";
import * as viewDataProviderHelper from "./z-view-data-provider.helper.js";

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

export const getReadVD = async (lessonId) => {
    const lesson = await lessonService.getOneById(lessonId);

    const data = { lesson };

    return data;
};

export const getFormData = async (lessonId, validationErrors, userData) => {
    const isEditMode = !!lessonId;

    const lessonEntitySchema = lessonSchema.entitySchema;
    const lessonFormSchema = lessonSchema.formSchema;

    const formFields = viewDataProviderHelper.getFormFields(lessonFormSchema, lessonEntitySchema);

    // formFields = {
    //     name: {
    //         id: "name",
    //         label: "Titlul lecției",
    //         required: true,
    //     },
    //     description: {
    //         id: "description",
    //         label: "Descriere",
    //         description: "Doar tu (proprietarul) poți vedea această descriere",
    //         required: true,
    //         hasFocus: true,
    //     },
    // };

    if (validationErrors) {
        const lesson = userData;

        formFields.name.value = lesson.name;
        formFields.description.value = lesson.description;

        Object.keys(formFields).forEach((key) => {
            const field = formFields[key];

            const fieldId = field.id;

            // const fieldSchema = entityMeta.fields[fieldId];

            // const newField = { id: fieldId, title: fieldSchema?.title, description: fieldSchema?.description };

            // const isRequired = fieldSchema?.validationRules?.find((x) => x.ruleId == "required");
            // if (isRequired) newField.required = true;

            // In case of validation errors, send data back to the end user
            if (lesson && lesson[fieldId]) {
                field.value = lesson[fieldId];
            }

            if (validationErrors && validationErrors[fieldId]) {
                field.hasError = true;
                field.message = validationErrors[fieldId];
            }
        });
    } else {
        if (isEditMode) {
            const lesson = await lessonService.getOneById(lessonId);

            formFields.name.value = lesson.name;
            formFields.description.value = lesson.description;
        }
    }

    // Set focus
    // const firstInvalidField = data.formFields.find((x) => x.hasError);

    // if (firstInvalidField) firstInvalidField.hasFocus = true;
    // else data.formFields[0].hasFocus = true;

    const firstFieldWithError = Object.keys(formFields).find((key) => formFields[key].hasError) || Object.keys(formFields)[0]; // returns the first field if no match
    // console.log(firstFieldWithError);

    formFields[firstFieldWithError].hasFocus = true;

    const data = { isEditMode, formFields };
    return data;
};

export const getListVD = async () => {
    const lessons = await lessonService.getAll();
    const data = { lessons };

    return data;
};
