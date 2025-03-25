import * as validator from "../validator.js";

const ruleValidator = (value) => value;
const ruleMessage = "Câmp obligatoriu";

export const required = { ruleValidator, ruleMessage };
