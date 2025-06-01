import { Router } from "express";
import * as lessonController from "../controllers/lesson.controller.js";
// import { isAuthenticated } from "../middlewares/is-authenticated.middleware.js";

const router = Router();

router.get("/", lessonController.getAll);

router.get("/:lessonId/modifica", lessonController.createOrEditGet);
router.post("/:lessonId/modifica", lessonController.createOrEditPost);

router.get("/adauga", lessonController.createGet);
router.post("/adauga", lessonController.createPost);

router.get("/:lessonId", lessonController.getOneById);
router.post("/:lessonId/sterge", lessonController.deleteOneById);

export default router;
