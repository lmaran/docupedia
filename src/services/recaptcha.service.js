// const httpHelper = require("../helpers/http.helper");
import * as httpHelper from "../helpers/http.helper.js";
// const config = require("../config");
import config from "../config/config.js";

export const checkResponse = async (token) => {
    const options = {
        host: "www.google.com",
        method: "POST",
        path: `/recaptcha/api/siteverify?secret=${config.recaptchaSecretKey}&response=${token}`,
    };

    return httpHelper.request(options);
};
