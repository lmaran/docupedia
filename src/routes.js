import { Router } from "express";

// import { isAuthenticated } from "../middlewares/is-authenticated.middleware.js";
import * as homeController from "./controllers/home.controller.js";
import * as authController from "./controllers/auth.controller.js";
import * as userController from "./controllers/user.controller.js";
import * as lessonController from "./controllers/lesson.controller.js";

const router = Router();

// home
router.get("/", homeController.getHomePage);
router.get("/check", homeController.healthCheck);

// auth
router.get("/auth/signup", authController.createGet);
router.post("/auth/signup", authController.createPost);
router.get("/auth/signup/ask-to-confirm", authController.signupAskToConfirmGet);
// // router.post("/signup/invite", isAuthenticated, userSignupController.postInviteToSignup);
// // router.get("/signup/invitation-sent", isAuthenticated, userSignupController.displaySignupInvitationSent);

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

// users
router.get("/users", userController.getAll);

// // /change-password/...
// router.get("/change-password", isAuthenticated, userController.getChangePassword);
// router.post("/change-password", isAuthenticated, userController.postChangePassword);

// lectii
router.get("/lectii", lessonController.getAll);
router.get(["/lectii/adauga", "/lectii/:lessonId/modifica"], lessonController.createOrEditGet);
router.post(["/lectii/adauga", "/lectii/:lessonId/modifica"], lessonController.createOrEditPost);
router.get("/lectii/:lessonId", lessonController.getOneById);
router.post("/lectii/:lessonId/sterge", lessonController.deleteOneById);

export default router;
