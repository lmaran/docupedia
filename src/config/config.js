// If we start the application with the flag --env-file=.env, Node.js will load all the variables from the .env file into the process.env object.
// So, starting with Node 20.6.0, we no longer need to use a library like "dotenv"
const config = {
    port: process.env.PORT || 1420,
    env: process.env.NODE_ENV || "noenv",
    deploymentSlot: process.env.DEPLOYMENT_SLOT || "noslot",
    externalRootUrl: process.env.EXTERNAL_ROOT_URL || "https://docupedia.ro",
    defaultEmailFrom: "Docupedia <info@matemaraton.ro>",
    var1: process.env.VAR1 || "var1_default",

    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    recaptchaApiKey: process.env.RECAPTCHA_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    mailgunKey: process.env.MAILGUN_KEY,
    secret1: process.env.SECRET1 || "secret1_default",
};

export default config;
