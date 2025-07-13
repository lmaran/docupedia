import * as validator from "./validator.js";
import { authRepository } from "../repositories/auth.repository.js";
import * as schema from "../schema/auth.schema.js";
import { ErrorTypes } from "../errors/errorTypes.js";

export const validateSignup = async (entityData) => {
    const entitySchema = schema.signupEntitySchema;

    const result = await validator.validate(entityData, entitySchema);

    // Email should be unique
    // Evaluate it after all other email rules have passed.
    if (!result.error?.details?.["email"]) {
        const found = await authRepository.getOneByEmail(entityData["email"]);
        if (found) {
            result.success = false;

            result.error ??= { type: ErrorTypes.VALIDATION_ERROR };
            result.error.details ??= {};
            result.error.details["email"] = "Există deja un utilizator cu această adresă de email";
        }
    }

    // result = {
    //      success: false,
    //      error: {
    //          type: "VALIDATION_ERROR",
    //          details: {
    //              firstName: 'Username must be at least 5 characters long!',
    //              ...
    //          }
    //     }
    // }
    return result;
};
