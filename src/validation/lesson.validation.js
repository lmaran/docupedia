import * as validator from "./validator.js";
import * as schema from "../schema/lesson.schema.js";

export const validate = async (entityData) => {
    const entitySchema = schema.entitySchema;

    const validationResult = await validator.validate(entityData, entitySchema);

    // const validationResult = {
    //     isValid: false,
    //     errors: {
    //       firstName: 'Username must be at least 5 characters long!',
    //       ...
    //     }
    // }
    return validationResult;
};
