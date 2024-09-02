import browserSync from "browser-sync";
import app from "./app.js";
import config from "./config/config.js";

app.listen(config.port, listening);

function listening() {
    console.log(`Listening on port ${config.port} ${config.env}`);

    // https://github.com/voorhoede/front-end-tooling-recipes/blob/master/express-with-nodemon-browsersync/index.js
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    if (`${config.env}` === "development") {
        browserSync({
            files: ["./web/views/**/*.js", "./**/*.hbs"],
            online: true, // to have also an external url as 192.168.1.17:1421 for testing on mobile
            open: false,
            port: config.port,
            proxy: "localhost:" + config.port,
            ui: false,
            ghostMode: false, // prevent Clicks, Scrolls & Form inputs on any device to be mirrored to all others. (otherwise strange behavior in edit catalog and multiple open tabs)
        });
    }
}
