import express from "express";
import config from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

// Health check for HAProxy (ex: docupedia-blue-production)
app.get("/check", (req, res) => {
    res.send(`docupedia-${process.env.DEPLOYMENT_SLOT || "noslot"}-${process.env.NODE_ENV || "noenv"}`);
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
