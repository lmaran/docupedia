import express from "express";
import config from "./config/config.js";
import * as userController from "./controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send(`Hello world! Var1=${config.var1}, Secret1=${config.secret1}`);
});

// Health check for HAProxy (ex: docupedia-blue-production)
router.get("/check", (req, res) => {
    res.send(`docupedia-${config.deployment_slot}-${config.env}`);
});

router.get("/utilizatori", userController.getAll);

router.get("/view", (req, res) => {
    res.render("home");
});

export default router;
