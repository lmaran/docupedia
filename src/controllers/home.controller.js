import config from "../config/config.js";

export const getHomePage = async (req, res) => {
    res.render("home");
};

// Health check for HAProxy (ex: docupedia-blue-production)
export const healthCheck = (req, res) => {
    res.send(`docupedia-${config.deployment_slot}-${config.env}`);
};
