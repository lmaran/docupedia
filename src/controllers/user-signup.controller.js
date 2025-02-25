import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import { userService } from "../services/user.service.js";
import * as entityModelService from "../services/entity-model.service.js";
import * as authService from "../services/auth.service.js";
// import * as emailService from "../services/email.service.js";

// const config = require("../config");
import config from "../config/config.js";
//const arrayHelper = require("../helpers/array.helper");
// import * as arrayHelper from "../helpers/array.helper.js";
//const cookieHelper = require("../helpers/cookie.helper");
import * as cookieHelper from "../helpers/cookie.helper.js";
import * as validationHelper from "../helpers/validation.helper.js";
import * as formHelper from "../helpers/form.helper.js";

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

export const getSignup = async (req, res) => {
    const userModel = entityModelService.getByName("user");
    const formFields = userModel.formFields;

    // const newFormFields = formFields.map((x) => ({ ...x })); // immutable
    // console.log(newFormFields);

    const newFormFields = formHelper.setFocus(formFields);

    const data = { formFields: newFormFields };

    //res.send(data);
    res.render("user/signup", { data });
};

export const postSignup = async (req, res) => {
    try {
        const userModel = entityModelService.getByName("user");
        // const formFields = userModel.formFields;

        const inputValues = {};
        userModel.formFields.forEach((x) => (inputValues[x.id] = req.body[x.id]?.trim()));

        const validationResult = await validationHelper.validate(inputValues, userModel);

        console.log(validationResult);

        if (validationResult.isValid) {
            // await authService.signupByUserRegistration(firstName, lastName, email, password);
            res.redirect("/signup/ask-to-confirm");
        } else {
            const newFormFields = userModel.formFields.map((x) => ({ ...x })); // immutable
            formHelper.setFocus(newFormFields);
            formHelper.setDefaultValues(inputValues, newFormFields);

            const data = { formFields: newFormFields };
            res.render("user/signup", { data });
        }
    } catch (err) {
        // handle dynamic validation errors
        // const validationErrors = [];
        // if (err.message === "EmailAlreadyExists") {
        //     validationErrors.push({
        //         field: "email",
        //         msg: "Există deja un cont cu acest email",
        //     });
        // }

        // if (validationErrors.length) {
        //     return flashAndReloadSignupPage(req, res, validationErrors);
        // }

        // @TODO display an error message (without details) and log the details
        return res.status(500).json(err.message);
    }
};

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

const getSignupStaticValidationErrors = (firstName, lastName, email, password, confirmPassword) => {
    try {
        const validationErrors = [];

        // lastName
        if (validator.isEmpty(lastName))
            validationErrors.push({
                field: "lastName",
                msg: "Câmp obligatoriu",
            });
        else if (!validator.isLength(lastName, { max: 50 }))
            validationErrors.push({
                field: "lastName",
                msg: "Maxim 50 caractere",
            });

        // firstName
        if (validator.isEmpty(firstName))
            validationErrors.push({
                field: "firstName",
                msg: "Câmp obligatoriu",
            });
        else if (!validator.isLength(firstName, { max: 50 }))
            validationErrors.push({
                field: "firstName",
                msg: "Maxim 50 caractere",
            });

        if (validator.isEmpty(email)) validationErrors.push({ field: "email", msg: "Câmp obligatoriu" });
        else if (!validator.isLength(email, { max: 50 }))
            validationErrors.push({
                field: "email",
                msg: "Maxim 50 caractere",
            });
        else if (!validator.isEmail(email)) validationErrors.push({ field: "email", msg: "Email invalid" });
        // else if (await userService.getOneByEmail(email))
        //     validationErrors.push({ field: "email", msg: "Exista deja un cont cu acest email" });

        // password
        if (validator.isEmpty(password))
            validationErrors.push({
                field: "password",
                msg: "Câmp obligatoriu",
            });
        else if (!validator.isLength(password, { min: 6 }))
            validationErrors.push({
                field: "password",
                msg: "Minim 6 caractere",
            });
        else if (!validator.isLength(password, { max: 50 }))
            validationErrors.push({
                field: "password",
                msg: "Maxim 50 caractere",
            });

        // confirm password
        if (validator.isEmpty(confirmPassword))
            validationErrors.push({
                field: "confirmPassword",
                msg: "Câmp obligatoriu",
            });
        else if (confirmPassword !== password)
            validationErrors.push({
                field: "confirmPassword",
                msg: "Parolele nu coincid",
            });

        return validationErrors;
    } catch (err) {
        throw new Error(err);
    }
};

const flashAndReloadSignupPage = (req, res, validationErrors) => {
    // const { lastName, firstName, email, password, confirmPassword } = req.body;
    // const initialValues = [
    //     { field: "lastName", val: lastName },
    //     { field: "firstName", val: firstName },
    //     { field: "email", val: email },
    //     { field: "password", val: password },
    //     { field: "confirmPassword", val: confirmPassword },
    // ];
    // keep old values at page reload by setting a flash message (a key, followed by a value)
    // req.flash("validationErrors", validationErrors);
    // req.flash("initialValues", initialValues);
    const currentUrl = req.get("referer"); // "/signup?invitationCode=..."
    return res.redirect(currentUrl);
};
