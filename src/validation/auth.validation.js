import * as validator from "./validator.js";
import { authRepository } from "../repositories/auth.repository.js";
import * as schema from "../schema/auth.schema.js";

export const validateSignup = async (entityData) => {
    const entitySchema = schema.signupEntitySchema;

    const validationResult = await validator.validate(entityData, entitySchema);

    // Email should be unique
    // Evaluate it after all other email rules have passed.
    if (!validationResult.errors?.["email"]) {
        const found = await authRepository.getOneByEmail(entityData["email"]);
        if (found) {
            (validationResult.errors ??= {})["email"] = "Există deja un utilizator cu această adresă de email";
            validationResult.isValid = false;
        }
    }

    // const validationResult = {
    //     isValid: false,
    //     errors: {
    //       firstName: 'Username must be at least 5 characters long!',
    //       ...
    //     }
    // }
    return validationResult;
};
