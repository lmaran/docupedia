import config from "../config/config.js";

import FormData from "form-data";
import Mailgun from "mailgun.js";

const domain = "mg.docupedia.ro";
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: "api", key: config.mailgun_key, url: "https://api.eu.mailgun.net" });

export const sendEmail = async (data) => {
    try {
        data.from = data.from || "Docupedia <info@docupedia.ro>";
        return await mg.messages.create(domain, data);
        // The return object has 3 props: {   status: 200, id: '<20250117135643.2f07ef730792bb62@mg.docupedia.ro>', message: 'Queued. Thank you.' }
    } catch (error) {
        // console.log(error);
        throw new Error(error); // re-throw the error
    }
};
