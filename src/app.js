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

// Parse an URL-encoded body (content-type:/x-www-form-urlencoded) and exposes the values in the req.body object
app.use(express.urlencoded({ extended: false }));
// Parse a JSON body (content-type:application/json) and exposes the values in the req.body object
app.use(express.json());

// Routes for static files. In prod use NGINX to serve them
app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", routes);

export default app;

// function f(value, char) {
//     return value.startsWith(char) ? "err" : `Must start with "${char}".`;
// }

// const result = f.toString();

// console.log(JSON.stringify(result));

// const arrayStr = "value, char";
// const array = arrayStr.split(",");

// console.log(array);

// console.log(array[0]);

// console.log(result);
