import { v4 as uuidv4 } from "uuid";
import { userService } from "../services/user.service.js";
// import * as entityService from "../services/entity.service.js";
import * as authService from "../services/auth.service.js";

// import * as emailService from "../services/email.service.js";

import * as cookieHelper from "../helpers/cookie.helper.js";

// const recaptchaService = require("../services/recaptcha.service");
// import * as recaptchaService from "../services/recaptcha.service.js";

export const postInviteToSignup = async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        const existingUser = await userService.getOneByEmail(email);

        if (existingUser && existingUser.status === "active") {
            return res.send("Există deja un utilizator activ cu acest email");
        }

        const uniqueId = existingUser && existingUser.signupCode ? existingUser.signupCode : uuidv4(); // keep the original code if exists

        const invitationInfo = {
            firstName,
            lastName,
        };

        if (existingUser) {
            existingUser.invitationInfo = invitationInfo;
            existingUser.status = "invited";
            existingUser.signupCode = uniqueId;
            existingUser.modifiedOn = new Date();

            await userService.updateOne(existingUser);
        } else {
            const newUser = {
                invitationInfo,
                status: "invited",
                signupCode: uniqueId,
                createdOn: new Date(),
            };
            if (email) newUser.email = email.toLowerCase(); // ensures that the email is saved in lowerCase

            await userService.insertOne(newUser);
        }

        // // Send this code on email
        // const rootUrl = config.externalUrl; // e.g. http://localhost:1417
        // const link = `${rootUrl}/signup?invitationCode=${uniqueId}`;

        // const emailData = {
        //     to: email,
        //     subject: "Invitație activare cont",
        //     html: `<html>Pentru activarea contului te rugăm să accesezi
        //         <a href="${link}">link-ul de activare</a>!
        //         </html>`,
        // };

        // await emailService.sendEmail(emailData);

        res.redirect("/signup/invitation-sent");
    } catch (err) {
        return res.json(err.message);
    }
};

// export const getSignup = async (req, res) => {
//     const entityId = "user";
//     const formId = "create";

//     const entityMeta = await entityService.getEntityMeta(entityId);

//     const formData = entityService.getFormData(entityMeta, formId);

//     // res.send(formData);
//     res.render("user/signup", formData);
// };

// export const postSignup = async (req, res) => {
//     try {
//         // const userData = userService.getUserSignupData(req.body);
//         // const validationResult = await userService.validate(userData);
//         // if (!validationResult.isValid) {
//         //     const viewData = userService.getViewData(userData, validationResult.errors);

//         //     return res.render("user/signup", viewData);
//         // }

//         // =========== old, but functional ===========
//         const entityId = "user";
//         const formId = "create";

//         const entityMeta = await entityService.getEntityMeta(entityId);

//         const entityData = entityService.getEntityData(req.body, entityMeta, formId);

//         const validationResult = await entityService.validate(entityData, entityMeta, formId);

//         if (!validationResult.isValid) {
//             const formData = entityService.getFormData(entityMeta, formId, entityData, validationResult.errors);

//             //return res.send(formData);
//             return res.render("user/signup", formData);
//         }

//         // await entityService.Create(entityData);
//         res.redirect("/signup/ask-to-confirm");
//     } catch (err) {
//         // @TODO display an error message (without details) and log the details
//         return res.status(500).json(err.message);
//     }
// };

export const getSignupConfirm = async (req, res) => {
    try {
        const activationCode = req.params.activationCode;

        const { token, refreshToken } = await authService.signupByActivationCode(activationCode);

        cookieHelper.setCookies(res, token, refreshToken);
        res.redirect("/signup/confirm-success");
    } catch (err) {
        const data = {
            message: err.message,
            userIsNotAuthenticated: !req.user,
        };

        if (err.message === "AccountAlreadyActivated") {
            data.message = "Acest cont a fost deja <strong>activat</strong>!";
            res.render("user/signup-confirm-info", data);
        } else {
            res.render("user/signup-confirm-error", data);
        }
    }
};

export const displaySignupAskToConfirm = async (req, res) => {
    res.render("user/signup-ask-to-confirm");
};

export const displaySignupInvitationSent = async (req, res) => {
    const data = {
        userIsNotAuthenticated: !req.user,
    };
    res.render("user/signup-invitation-ask-to-confirm", data);
};

export const getSignupConfirmSuccess = async (req, res) => {
    const data = {
        userIsNotAuthenticated: !req.user,
    };
    res.render("user/signup-confirm-success", data);
};
