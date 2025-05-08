import { Router } from "express";
import config from "../config/config.js";
import * as homeController from "../controllers/home.controller.js";

const router = Router();

router.get("/", homeController.getHomePage);

// Health check for HAProxy (ex: docupedia-blue-production)
router.get("/check", (req, res) => {
    res.send(`docupedia-${config.deployment_slot}-${config.env}`);
});

router.get("/view", (req, res) => {
    res.render("home");
});

export default router;
