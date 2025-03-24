import * as fileHelper from "../helpers/file.helper.js";
import * as appService from "./app.service.js";
import * as validationHelper from "../helpers/validator.helper.js";

export const getEntityMeta = async (entityName) => {
    // https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/marketing-fields#field-type-and-format-options
    return await fileHelper.getJson(`../db/entities/${entityName}.json`);
};

export const getEntitySchema = (entityMeta, formFields) => {
    if (!entityMeta?.fields) return null;

    const schema = {};

    formFields.forEach((field) => {
        const fieldId = field.id;
        // We need "title" to mention some fields în validation messages (e.g. "Nu coincide cu Parola")
        schema[fieldId] = { validationRules: entityMeta.fields[fieldId]?.validationRules, title: entityMeta.fields[fieldId]?.title };
    });
    return schema;
};

export const getFormFields = (entityMeta, formId) => {
    // An array of fields, in the order they appear on the form
    return (entityMeta.forms || []).find((form) => form.id == formId)?.fields;
};

export const getEntityData = (reqBody, entityMeta, formId) => {
    // In req.body the fields are sorted alphabetically. Also there are prototype properties and also technical fields (e.g. recaptcha). So to extract data from request we need a list of fields on the form
    if (!reqBody) return null;

    // formFields = [{ id: "firstName" }, ...];
    const formFields = getFormFields(entityMeta, formId);

    const entityData = {};
    formFields.forEach((f) => (entityData[f.id] = reqBody[f.id]?.trim()));

    // const entityData = {
    //     firstName: "Lucian",
    //     ...
    // };
    return entityData;
};

export const validate = async (entityData, entityMeta, formId) => {
    // const data = {
    //     firstName: "Lucian",
    //     ...
    // };
    const formFields = getFormFields(entityMeta, formId);
    const appMeta = await appService.getAppMeta();

    // Register custom rules
    validationHelper.removeAllCustomRules();
    if (appMeta?.validationRules) {
        appMeta.validationRules.forEach((ruleStr) => {
            const ruleName = ruleStr.name;

            const params = ruleStr.params?.split(",");
            const body = ruleStr.body;

            const ruleFunction = new Function(...params, body);

            validationHelper.registerCustomRule(ruleName, ruleFunction);
        });
    }

    // Register custom messages
    validationHelper.removeAllCustomMessages();
    if (appMeta?.validationMessages) {
        appMeta.validationMessages.forEach((x) => {
            validationHelper.registerCustomMessage(x.ruleId, x.message);
        });
    }

    const entitySchema = getEntitySchema(entityMeta, formFields);
    // entitySchema = {
    //     firstName: {
    //         validationRules: [{ rule: "required" }, { rule: "minLength", params: [5], message: "Username must be at least {0} characters long!" }],
    //     ...
    //     },
    // };

    const validationResult = await validationHelper.validate(entityData, entitySchema);
    // const validationResult = {
    //     isValid: false,
    //     errors: {
    //       firstName: 'Username must be at least 5 characters long!',
    //       ...
    //     }
    // }

    return validationResult;
};

export const getFormData = (entityMeta, formId, entityData, errors) => {
    const formFields = getFormFields(entityMeta, formId);

    const formData = { formFields: [] };

    formFields.forEach((field) => {
        const fieldId = field.id;

        const fieldSchema = entityMeta.fields[fieldId];

        const newField = { id: fieldId, title: fieldSchema?.title, description: fieldSchema?.description };

        const isRequired = fieldSchema?.validationRules?.find((x) => x.ruleId == "required");
        if (isRequired) newField.required = true;

        // In case of validation errors, send data back to the end user
        if (entityData && entityData[fieldId]) {
            newField.value = entityData[fieldId];
        }

        if (errors && errors[fieldId]) {
            newField.hasError = true;
            newField.message = errors[fieldId];
        }

        formData.formFields.push(newField);
    });

    // Set focus
    const firstInvalidField = formData.formFields.find((x) => x.hasError);

    if (firstInvalidField) firstInvalidField.hasFocus = true;
    else formData.formFields[0].hasFocus = true;

    // formFields= [
    //     {
    //         id: "lastName",
    //         label: "Nume",
    //         required: true,
    //     }]
    return formData;
};
