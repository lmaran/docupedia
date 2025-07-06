const rules = new Map();
const messages = new Map();

// We call each function with 4 parameters: "value", "...params", "dataObj" and "schemaObj".
// Each validation function should return "true" if the value is valid, or "false", otherwise.
// Definition: { "ruleId": "minLength", "params": [6], "message": "Parola trebuie să aibă minim {0} caractere" }
// Call: validatorFn(value, ...params, data, schema);

// Required
export const required = (value) => value;
rules.set("required", required);
messages.set("required", "Câmp obligatoriu");

// Email
export const email = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
};
rules.set("email", email);
messages.set("email", "Email invalid");

// minLength
export const minLength = (value, length) => value.length >= length;
rules.set("minLength", minLength);
messages.set("minLength", "Minim {0} caractere");

// maxLength
export const maxLength = (value, length) => value.length <= length;
rules.set("maxLength", maxLength);
messages.set("maxLength", "Maxim {0} caractere");

// compare
export const compare = (value, sourceField, dataObj) => value == dataObj[sourceField];
rules.set("compare", compare);
messages.set("compare", "Nu coincide cu {0}");

export { rules, messages };
