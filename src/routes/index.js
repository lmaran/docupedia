import { Router } from "express";

import homeRoutes from "./home.routes.js";
import userRoutes from "./user.routes.js";
import userSignupRoutes from "./user-signup.routes.js";
import userResetPasswordRoutes from "./user-reset-password.routes.js";
import userChangePasswordRoutes from "./user-reset-password.routes.js";
import userLoginRoutes from "./user-login.routes.js";
import userLogoutRoutes from "./user-logout.routes.js";

const router = Router();

router.use("/", homeRoutes); // /check, /view
router.use("/utilizatori", userRoutes);
router.use("/signup", userSignupRoutes);
router.use("/reset-password", userResetPasswordRoutes);
router.use("/change-password", userChangePasswordRoutes);
router.use("/login", userLoginRoutes);
router.use("/logout", userLogoutRoutes);

export default router;
