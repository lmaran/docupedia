// Dacă utilizatorul este neautentificat  => auth.routes.js  => /signup, /login, /forgot-password, /reset-password/:token, /verify-email/:token
// Dacă utilizator este deja autentificat => users.routes.js => /profile, /change-password

import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
// import { isAuthenticated } from "../middlewares/is-authenticated.middleware.js";

const router = Router();

router.get("/", userController.getAll);

// // /change-password/...
// router.get("/change-password", isAuthenticated, userController.getChangePassword);
// router.post("/change-password", isAuthenticated, userController.postChangePassword);

export default router;
