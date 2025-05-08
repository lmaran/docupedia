import { Router } from "express";
import * as userChangePasswordController from "../controllers/user-change-password.controller.js";
import { isAuthenticated } from "../middlewares/is-authenticated.middleware.js";

const router = Router();

// /change-password/...
router.get("/", isAuthenticated, userChangePasswordController.getChangePassword);
router.post("/", isAuthenticated, userChangePasswordController.postChangePassword);

export default router;
