import { Router } from "express";
import * as userResetPasswordController from "../controllers/user-reset-password.controller.js";

const router = Router();

// /reset-password/...
router.get("/", userResetPasswordController.getResetPassword);
router.post("/", userResetPasswordController.postResetPassword);
router.get("/ask-to-confirm", userResetPasswordController.displayResetPasswordAskToConfirm);
router.get("/confirm/:resetPasswordCode", userResetPasswordController.getResetPasswordConfirm);
router.get("/confirm-success", userResetPasswordController.getResetPasswordConfirmSuccess);

export default router;
