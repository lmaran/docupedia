import { Router } from "express";
import * as userLoginController from "../controllers/user-login.controller.js";

const router = Router();

// /login/...
router.get("/", userLoginController.getLogin);
router.post("/", userLoginController.postLogin);

export default router;
