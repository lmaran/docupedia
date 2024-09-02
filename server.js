import browserSync from "browser-sync";
import express from "express";
import config from "./config/config.js";
import routes from "./routes.js";

const app = express();

app.get("/", (req, res) => {
    res.send(`Hello world! Var1=${config.var1}, Secret1=${config.secret1}`);
});

// Health check for HAProxy (ex: docupedia-blue-production)
app.get("/check", (req, res) => {
    res.send(`docupedia-${config.deployment_slot}-${config.env}`);
});

app.use("/", routes);

app.listen(config.port, listening);

function listening() {
    console.log(`Listening on port ${config.port} ${config.env}`);

    // https://github.com/voorhoede/front-end-tooling-recipes/blob/master/express-with-nodemon-browsersync/index.js
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    if (`${config.env}` === "development") {
        // const browserSync = require("browser-sync");

        browserSync({
            files: ["./web/views/**/*.js", "./**/*.hbs"],
            online: true, // to have also an external url as 192.168.1.17:1417 for testing on mobile
            open: false,
            port: config.port,
            proxy: "localhost:" + config.port,
            ui: false,
            ghostMode: false, // prevent Clicks, Scrolls & Form inputs on any device to be mirrored to all others. (otherwise strange behavior in edit catalog and multiple open tabs)
        });
    }
}
