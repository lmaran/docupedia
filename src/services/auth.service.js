import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import config from "../config/config.js";
import { authRepository } from "../repositories/auth.repository.js";
import * as authValidation from "../validation/auth.validation.js";
import * as emailService from "../services/email.service.js";

export const insertOne = async (item) => {
    // Validate
    const validationResult = await authValidation.validateSignup(item);
    if (!validationResult.success) return validationResult;

    // Prepare data
    item.status = "pending_confirmation";
    item.createdOn = new Date();
    item.email = item.email.toLowerCase();
    item.signupCode = uuidv4();
    item.password = await bcrypt.hash(item.password, 10);
    delete item.confirmPassword;

    // Insert data in DB
    const insertedId = await authRepository.insertOne(item);

    // Send the activation code on email
    const externalRootUrl = config.externalRootUrl; // e.g. http://localhost:1417
    const link = `${externalRootUrl}/auth/signup/confirm/${item.signupCode}`;
    const data = {
        to: item.email,
        subject: "Activare cont",
        html: `<html>Pentru activarea contului te rugăm să accesezi următorul link:
                    <a href="${link}">${link}</a>
                </html>`,
    };
    const result = await emailService.sendEmail(data);

    if (result.status != 200) {
        // TODO:
        // 1. undo from DB and return an error message
        // 2. return an error
        // Test only
        return { success: false, error: { type: "NOT_FOUND", code: "USER_NOT_FOUND", message: "Utilizator negăsit", details: { userId: 123 } } };
    }

    return { success: true, data: insertedId };
};
