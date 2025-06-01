// Dacă utilizatorul este neautentificat  => auth.routes.js  => /signup, /login, /forgot-password, /reset-password/:token, /verify-email/:token
// Dacă utilizator este deja autentificat => users.routes.js => /profile, /change-password

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

// signup
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
// // router.post("/signup/invite", isAuthenticated, userSignupController.postInviteToSignup);
// // router.get("/signup/invitation-sent", isAuthenticated, userSignupController.displaySignupInvitationSent);
// // router.get("/signup/ask-to-confirm", userSignupController.displaySignupAskToConfirm);
// // router.get("/signup/confirm/:activationCode", userSignupController.getSignupConfirm);
// // router.get("/signup/confirm-success", userSignupController.getSignupConfirmSuccess);

// // login
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);

// // logout
// // logout (TODO - recomandarea este să folosești /logout pe POST, nu pe GET)
// // Este o acțiune asupra sesiunii (token, cookie etc), nu asupra profilului sau preferințelor => o păstrăm pe /auth (nu pe /users).
// router.get("/logout", authController.logout);

// // forgot-password
// // Serverul trimite email cu linkul: /auth/reset-password/abc123
// router.post("/forgot-password", authController.forgotPassword);

// // Serverul validează tokenul și actualizează parola
// router.post("/reset-password/:token", authController.resetPassword);
// router.get("/verify-email/:token", authController.verifyEmail);

// // /reset-password
// router.get("/reset-password", authController.getResetPassword);
// router.post("/reset-password", authController.postResetPassword);
// router.get("/reset-password/ask-to-confirm", authController.displayResetPasswordAskToConfirm);
// router.get("/reset-password/confirm/:resetPasswordCode", authController.getResetPasswordConfirm);
// router.get("/reset-password/confirm-success", authController.getResetPasswordConfirmSuccess);

export default router;
