import express from "express";
import { engine } from "express-handlebars";
import handlebarHelpers from "./helpers/handlebar.helper.js";
import routes from "./routes.js";

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

app.use("/", routes);

export default app;
