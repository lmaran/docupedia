import config from "../config/config.js";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import { ErrorTypes } from "../errors/errorTypes.js";
import { ErrorCode } from "../errors/errorCode.js";
import { serializeError } from "../errors/error.helper.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: "api", key: config.mailgunKey, url: "https://api.eu.mailgun.net" });

export const sendEmail = async (data) => {
    try {
        data.from = data.from || config.defaultEmailFrom;
        return await mg.messages.create(config.mailgunDomain, data);
        // The return object has 3 props: {   status: 200, id: '<20250117135643.2f07ef730792bb62@mg.docupedia.ro>', message: 'Queued. Thank you.' }
    } catch (error) {
        return {
            success: false,
            error: {
                type: ErrorTypes.EXTERNAL_API_ERROR,
                code: ErrorCode.MAILGUN_API_ERROR,
                message: "Emailul nu a putut fi trimis",
                details: serializeError(error),
            },
        };
    }
};
