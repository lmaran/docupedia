import { Router } from "express";
import * as userLogoutController from "../controllers/user-logout.controller.js";

const router = Router();

// /logout/...
router.get("/logout", userLogoutController.logout);

export default router;
