// See also https://github.com/Azure-Samples/ms-identity-ciam-javascript-tutorial/blob/main/1-Authentication/5-sign-in-express/App/server.js
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
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
