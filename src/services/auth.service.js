import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { authRepository } from "../repositories/auth.repository.js";
import * as authValidation from "../validation/auth.validation.js";

export const insertOne = async (item) => {
    const validationResult = await authValidation.validateSignup(item);
    if (!validationResult.isValid) return validationResult;

    item.status = "pending_confirmation";
    item.createdOn = new Date();
    item.email = item.email.toLowerCase();
    item.signupCode = uuidv4();
    item.password = await bcrypt.hash(item.password, 10);
    delete item.confirmPassword;

    const insertedId = await authRepository.insertOne(item);
    return { isValid: true, result: insertedId };
};
