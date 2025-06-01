import { Router } from "express";

import homeRoutes from "./home.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import lessonRoutes from "./lesson.routes.js";

const router = Router();

router.use("/", homeRoutes); // /check, /view
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/lectii", lessonRoutes);

export default router;
