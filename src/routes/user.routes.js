import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

// /utilizatori/
router.get("/", userController.getAll);

export default router;
