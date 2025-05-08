import { Router } from "express";
import * as userSignupController from "../controllers/user-signup.controller.js";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware.js";

const router = Router();

// /signup/...
router.get("/", userSignupController.getSignup);
router.post("/", userSignupController.postSignup);
router.post("/invite", isAuthenticated, userSignupController.postInviteToSignup);
router.get("/invitation-sent", isAuthenticated, userSignupController.displaySignupInvitationSent);
router.get("/ask-to-confirm", userSignupController.displaySignupAskToConfirm);
router.get("/confirm/:activationCode", userSignupController.getSignupConfirm);
router.get("/confirm-success", userSignupController.getSignupConfirmSuccess);

export default router;
