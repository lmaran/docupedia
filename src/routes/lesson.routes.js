import { Router } from "express";
import * as lessonController from "../controllers/lesson.controller.js";
// import { isAuthenticated } from "../middlewares/is-authenticated.middleware.js";

const router = Router();

router.get("/", lessonController.getAll);
router.get("/:lessonId", lessonController.getOneById);

router.get(["/adauga", "/:lessonId/modifica"], lessonController.createOrEditGet);
router.post(["/adauga", "/:lessonId/modifica"], lessonController.createOrEditPost);

router.post("/:lessonId/sterge", lessonController.deleteOneById);

export default router;
