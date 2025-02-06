import express from "express";
import { engine } from "express-handlebars";
import handlebarHelpers from "./helpers/handlebar.helper.js";

import routes from "./routes.js";
import path from "node:path";
const __dirname = import.meta.dirname;

const app = express();

// view engine setup
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: handlebarHelpers,
    }),
);
app.set("view engine", ".hbs");
app.set("views", "./src/views");

// routes for static files; in prod set NGINX to serve them
// app.use("/", express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })); // one year in milliseconds
app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", routes);

export default app;
