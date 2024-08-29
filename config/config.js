// If we start the application with the flag --env-file=.env, Node.js will load all the variables from the .env file into the process.env object.
// So, starting with Node 20.6.0, we no longer need to use a library like "dotenv"
const config = {
    port: process.env.PORT || 1420,
    env: process.env.NODE_ENV || "noenv",
    deployment_slot: process.env.DEPLOYMENT_SLOT || "noslot",

    var1: process.env.VAR1 || "var1_default",
    secret1: process.env.SECRET1 || "secret1_default",
};

export default config;
