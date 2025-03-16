import * as fileHelper from "../helpers/file.helper.js";
import * as appService from "./app.service.js";
import * as validationHelper from "../helpers/validator.helper.js";

export const getMetadata = async (entityName) => {
    return await fileHelper.getJson(`../db/entities/${entityName}.json`);
};

export const getSchema = (entityMeta, formFields) => {
    if (!entityMeta?.fields) return null;

    const schema = {};

    formFields.forEach((field) => {
        const fieldId = field.id;
        schema[fieldId] = { rules: entityMeta.fields[fieldId]?.rules };
    });

    // for (const fieldId in entityMeta.fields) {
    //     schema[fieldId] = { rules: entityMeta.fields[fieldId]?.rules };
    // }

    // Object.keys(entityMeta.fields).forEach((fieldId) => {
    //     schema[fieldId] = { roles: entityMeta.fields[fieldId]?.rules };
    // });

    return schema;
};

export const getFormFields = (entityMeta, formId) => {
    // A list of fields, in the order they appear on the form
    const form = (entityMeta.forms || []).find((x) => x.id == formId);
    return form.fields;
};

export const getDataFromRequest = (reqBody, entityMeta, formId) => {
    // In req.body the fields are sorted alphabetically. Also there are prototype properties and also technical fields (e.g. recaptcha). So to extract data from request we need a list of fields on the form
    if (!reqBody) return null;

    // const formFields = [{ id: "firstName" }, { id: "lastName" }, { id: "email" }, { id: "password" }, { id: "confirmPassword" }];
    const formFields = getFormFields(entityMeta, formId);

    const result = {};
    formFields.forEach((f) => (result[f.id] = reqBody[f.id]?.trim()));

    // const result = {
    //     firstName: "Luc",
    //     lastName: "Maran",
    //     email: "lucian.maran-gmail.com",
    //     password: "pas1",
    //     confirmPassword: "",
    //     // promoCode: "DISCOUNT2024",
    // };
    return result;
};

export const validate = async (data, entityMeta, formId) => {
    const formFields = getFormFields(entityMeta, formId);
    const appMeta = await appService.getMetadata();
    // console.log(appMeta);

    // Register a new rule with a default message
    //registerRule("startsWith", (value, char) => (value.startsWith(char) ? null : `Must start with "${char}".`));
    if (appMeta?.validationRules) {
        appMeta.validationRules.forEach((ruleStr) => {
            // console.log(ruleStr);

            const params = ruleStr.params?.split(",");
            // console.log(params);

            // const array = JSON.parse(xxx);
            // console.log(array);

            // const params = JSON.parse(ruleStr.params?.split(",") || []);
            // console.log(params);

            const body = ruleStr.body;
            // console.log(body);

            const rule = new Function(...params, body);
            // console.log(rule.toString());

            validationHelper.registerRule(ruleStr.name, rule);
        });
    }

    // // test
    // const rules = validationHelper.getRules();
    // console.log(rules.size);

    // console.log(rules.get("maxLength").toString());
    // console.log(rules.get("startsWith").toString());

    // if (appMeta?.validationMessages) {
    //     // // Custom messages per rule (global override)
    //     // const customMessages = {
    //     //     minLength: "Oops! Too short, must be at least {0} characters.",
    //     //     startsWith: "Promo codes should always start with PROMO.",
    //     // };
    //     validationHelper.registerMessages(appMeta.validationMessages);
    // }

    // const schema2 = {
    //     firstName: {
    //         rules: [{ rule: "required" }, { rule: "minLength", params: [5], message: "Username must be at least {0} characters long!" }],
    //     },
    //     lastName: {
    //         rules: [{ rule: "required" }, { rule: "minLength", params: [5], message: "Username must be at least {0} characters long!" }],
    //     },
    //     email: {
    //         rules: [{ rule: "required" }, { rule: "email" }],
    //     },
    //     password: {
    //         rules: [{ rule: "minLength", params: [8], message: "Your password should have at least {0} characters." }],
    //     },
    //     confirmPassword: {
    //         rules: [{ rule: "required" }, { rule: "email" }],
    //     },
    //     // promoCode: {
    //     //     rules: [{ rule: "startsWith", params: ["PROMO"] }],
    //     // },
    // };
    const schema = getSchema(entityMeta, formFields);
    // console.log(schema);

    const validationResult = await validationHelper.validate(data, schema);
    // console.log(validationResult);

    // validationResult:
    // {
    //     isValid: false,
    //     errors: {
    //       firstName: 'Username must be at least 5 characters long!',
    //       email: 'Invalid email format.',
    //       password: 'Your password should have at least 8 characters.',
    //       confirmPassword: 'This field is required.',
    //       promoCode: 'Promo codes should always start with PROMO.'
    //     }
    // }

    // const validationResult = {
    //     isValid: true,
    // };

    console.log(validationResult);

    return validationResult;
};

export const getFormData = (data, entityMeta, formId, errors) => {
    const formFields = getFormFields(entityMeta, formId);

    const formData = { formFields: [] };

    formFields.forEach((field) => {
        const fieldId = field.id;

        const fieldSchema = entityMeta.fields[fieldId];

        console.log(fieldSchema);

        const newField = { id: fieldId, label: fieldSchema?.title, helpMsg: fieldSchema?.description, required: true, value: data[fieldId] };

        // const errorMessage = errors[fieldId]?.message;
        if (errors[fieldId]) {
            newField.hasError = true;
            newField.message = errors[fieldId]?.message;
        }

        formData.formFields.push(newField);

        // schema[fieldId] = { rules: entityMeta.fields[fieldId]?.rules };
    });

    // formFields= [
    //     {
    //         id: "lastName",
    //         label: "Nume",
    //         required: true,
    //     }]
    return formData;
};
