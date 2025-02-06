import express from "express";
import config from "./config/config.js";
import * as userController from "./controllers/user.controller.js";

import * as userResetPasswordController from "./controllers/user-reset-password.controller.js";
import * as userChangePasswordController from "./controllers/user-change-password.controller.js";
import * as userSignupController from "./controllers/user-signup.controller.js";
import * as userLoginController from "./controllers/user-login.controller.js";
import * as userLogoutController from "./controllers/user-logout.controller.js";

import * as homeController from "./controllers/home.controller.js";

const router = express.Router();
// const isAuthenticated = require("./middlewares/is-authenticated.middleware").isAuthenticated;
import { isAuthenticated } from "./middlewares/is-authenticated.middleware.js";

// router.get("/", (req, res) => {
//     res.send(`Hello world! Var1=${config.var1}, Secret1=${config.secret1}`);
// });
router.get("/", homeController.getHomePage);

// Health check for HAProxy (ex: docupedia-blue-production)
router.get("/check", (req, res) => {
    res.send(`docupedia-${config.deployment_slot}-${config.env}`);
});

router.get("/utilizatori", userController.getAll);

router.get("/view", (req, res) => {
    res.render("home");
});

// user-login/logout
router.get("/login", userLoginController.getLogin);
router.post("/login", userLoginController.postLogin);
router.get("/logout", userLogoutController.logout);

// user-signup
router.post("/signup/invite", isAuthenticated, userSignupController.postInviteToSignup);
router.get("/signup/invitation-sent", isAuthenticated, userSignupController.displaySignupInvitationSent);
router.get("/signup", userSignupController.getSignup);
router.post("/signup", userSignupController.postSignup);
router.get("/signup/ask-to-confirm", userSignupController.displaySignupAskToConfirm);
router.get("/signup/confirm/:activationCode", userSignupController.getSignupConfirm);
router.get("/signup/confirm-success", userSignupController.getSignupConfirmSuccess);

// user-change-password
router.get("/change-password", isAuthenticated, userChangePasswordController.getChangePassword);
router.post("/change-password", isAuthenticated, userChangePasswordController.postChangePassword);

// user-reset-password (step1: request, step2: confirmation)
router.get("/reset-password", userResetPasswordController.getResetPassword);
router.post("/reset-password", userResetPasswordController.postResetPassword);
router.get("/reset-password/ask-to-confirm", userResetPasswordController.displayResetPasswordAskToConfirm);
router.get("/reset-password/confirm/:resetPasswordCode", userResetPasswordController.getResetPasswordConfirm);
router.get("/reset-password/confirm-success", userResetPasswordController.getResetPasswordConfirmSuccess);

export default router;
