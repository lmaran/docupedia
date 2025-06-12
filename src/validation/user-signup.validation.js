import * as validator from "./validator.helper.js";
import * as schema from "../schema/auth.schema.js";

export const validate = async (entityData) => {
    const entitySchema = schema.signupEntitySchema;

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
