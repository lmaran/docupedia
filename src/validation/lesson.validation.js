import * as validator from "../helpers/validator.helper.js";
import * as schema from "../schema/lesson.schema.js";

export const validate = async (lessonData) => {
    // const data = {
    //     firstName: "Lucian",
    //     ...
    // };
    // const formFields = getFormFields(entityMeta, formId);
    // const appMeta = await appService.getAppMeta();

    // const lessonSchema = {
    //     name: {
    //         title: "Nume",
    //         type: "string",
    //         validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    //     },
    //     description: {
    //         title: "Prenume",
    //         type: "string",
    //         validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    //     },
    // };

    const lessonSchema = schema.entitySchema;

    const validationResult = await validator.validate(lessonData, lessonSchema);
    // const validationResult = {
    //     isValid: false,
    //     errors: {
    //       firstName: 'Username must be at least 5 characters long!',
    //       ...
    //     }
    // }

    return validationResult;
};
