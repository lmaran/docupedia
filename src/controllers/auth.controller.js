// import { v4 as uuidv4 } from "uuid";
// import { userService } from "../services/user.service.js";
import * as authService from "../services/auth.service.js";
import * as authViewDataProvider from "../viewDataProviders/auth.view-data-provider.js";

// import * as emailService from "../services/email.service.js";

// import * as cookieHelper from "../helpers/cookie.helper.js";

// const recaptchaService = require("../services/recaptcha.service");
// import * as recaptchaService from "../services/recaptcha.service.js";

// export const postInviteToSignup = async (req, res) => {
//     try {
//         const { email, firstName, lastName } = req.body;
//         const existingUser = await userService.getOneByEmail(email);

//         if (existingUser && existingUser.status === "active") {
//             return res.send("Există deja un utilizator activ cu acest email");
//         }

//         const uniqueId = existingUser && existingUser.signupCode ? existingUser.signupCode : uuidv4(); // keep the original code if exists

//         const invitationInfo = {
//             firstName,
//             lastName,
//         };

//         if (existingUser) {
//             existingUser.invitationInfo = invitationInfo;
//             existingUser.status = "invited";
//             existingUser.signupCode = uniqueId;
//             existingUser.modifiedOn = new Date();

//             await userService.updateOne(existingUser);
//         } else {
//             const newUser = {
//                 invitationInfo,
//                 status: "invited",
//                 signupCode: uniqueId,
//                 createdOn: new Date(),
//             };
//             if (email) newUser.email = email.toLowerCase(); // ensures that the email is saved in lowerCase

//             await userService.insertOne(newUser);
//         }

//         // // Send this code on email
//         // const rootUrl = config.externalUrl; // e.g. http://localhost:1417
//         // const link = `${rootUrl}/signup?invitationCode=${uniqueId}`;

//         // const emailData = {
//         //     to: email,
//         //     subject: "Invitație activare cont",
//         //     html: `<html>Pentru activarea contului te rugăm să accesezi
//         //         <a href="${link}">link-ul de activare</a>!
//         //         </html>`,
//         // };

//         // await emailService.sendEmail(emailData);

//         res.redirect("/signup/invitation-sent");
//     } catch (err) {
//         return res.json(err.message);
//     }
// };

export const createGet = async (req, res) => {
    const formData = await authViewDataProvider.getFormData();

    //res.send(data);
    res.render("auth/signup", formData);
};

// export const getSignup = async (req, res) => {
//     const viewData = await authService.getSignupViewData();
//     res.render("auth/signup", viewData);
// };

// only POST
export const createPost = async (req, res) => {
    const signup = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    const result = await authService.insertOne(signup);

    if (!result.isValid) {
        const formData = await authViewDataProvider.getFormData(result.errors, signup);
        return res.render("auth/signup", formData);
    }

    res.redirect("/auth/signup/ask-to-confirm");
};

// export const signupAskToConfirmGet = async (req, res) => {
//     const activationCode = req.params.activationCode;

//     const { token, refreshToken } = await authService.signupByActivationCode(activationCode);

//     cookieHelper.setCookies(res, token, refreshToken);
//     res.redirect("/signup/confirm-success");

//     const data = {
//         message: err.message,
//         userIsNotAuthenticated: !req.user,
//     };

//     if (err.message === "AccountAlreadyActivated") {
//         data.message = "Acest cont a fost deja <strong>activat</strong>!";
//         res.render("user/signup-confirm-info", data);
//     } else {
//         res.render("user/signup-confirm-error", data);
//     }
// };

export const signupAskToConfirmGet = async (req, res) => {
    res.render("auth/signup-ask-to-confirm");
};

// export const displaySignupInvitationSent = async (req, res) => {
//     const data = {
//         userIsNotAuthenticated: !req.user,
//     };
//     res.render("user/signup-invitation-ask-to-confirm", data);
// };

// export const getSignupConfirmSuccess = async (req, res) => {
//     const data = {
//         userIsNotAuthenticated: !req.user,
//     };
//     res.render("user/signup-confirm-success", data);
// };
