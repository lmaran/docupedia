import { required } from "./default-rules/required.rule.js";
import { email } from "./default-rules/email.rule.js";

// We call each function with 4 parameters: "value", "...params", "dataObj" and "schemaObj".
// Each validation function should return "true" if the value is valid, or "false", otherwise.

// export const required = (value) => value;
// export const email = (value) => {
//     // https://www.geeksforgeeks.org/javascript-program-to-validate-an-email-address/
//     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return pattern.test(value);
// };

// Definition: { "ruleId": "minLength", "params": [6], "message": "Parola trebuie să aibă minim {0} caractere" }
// Call: validatorFn(value, ...params, data, schema);
export const minLength = (value, length) => value.length >= length;
export const maxLength = (value, length) => value.length <= length;
export const sameAs = (value, sourceField, dataObj) => value == dataObj[sourceField];

const rules = new Map();

rules.set("required", required.validator);
rules.set("email", email);
rules.set("minLength", minLength);
rules.set("maxLength", maxLength);
rules.set("sameAs", sameAs);

const messages = new Map();

messages.set("required", required.message);
messages.set("email", "Email invalid");
messages.set("minLength", "Minim {0} caractere");
messages.set("maxLength", "Maxim {0} caractere");
messages.set("sameAs", "Nu coincide cu {0}");

export { rules, messages };
