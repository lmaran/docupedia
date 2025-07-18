// import * as authService from "../services/auth.service.js";
import * as authSchema from "../schema/auth.schema.js";
import * as viewDataProviderHelper from "./view-data-provider.helper.js";

export const getFormData = async (validationErrors, entityInputData) => {
    const entitySchema = authSchema.signupEntitySchema;
    const formSchema = authSchema.signupFormSchema;

    const formFields = viewDataProviderHelper.getFormFields(formSchema, entitySchema);

    if (validationErrors) {
        // In case of validation errors...
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
    }

    // Set focus
    const firstFieldWithError = Object.keys(formFields).find((key) => formFields[key].hasError) || Object.keys(formFields)[0]; // returns the first field if no match
    formFields[firstFieldWithError].hasFocus = true;

    const data = { formFields };
    return data;
};
