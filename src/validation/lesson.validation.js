import * as validator from "./validator.js";
import * as schema from "../schema/lesson.schema.js";

export const validate = async (entityData) => {
    const entitySchema = schema.entitySchema;

    const result = await validator.validate(entityData, entitySchema);

    // result = {
    //      success: false,
    //      error: {
    //          type: "VALIDATION_ERROR"
    //          details: {
    //              firstName: 'Username must be at least 5 characters long!',
    //              ...
    //          }
    //     }
    // }
    return result;
};
