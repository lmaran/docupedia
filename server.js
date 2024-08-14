import express from "express";
import config from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
    res.send(`Hello world! Var1=${config.var1}, Secret1=${config.secret1}`);
});

// Health check for HAProxy (ex: docupedia-blue-production)
app.get("/check", (req, res) => {
    res.send(`docupedia-${config.deployment_slot}-${config.node_env}`);
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
