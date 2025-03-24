// We call each function with 4 parameters: "value", "...params", "dataObj" and "schemaObj".
// Each validation function should return "null" if the value is valid, or an "error message", otherwise.

export const required = (value) => (value ? null : "Câmp obligatoriu");
export const email = (value) => {
    // https://www.geeksforgeeks.org/javascript-program-to-validate-an-email-address/
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) ? null : "Email invalid";
};
export const minLength = (value, length) => (value.length >= length ? null : `Minim ${length} caractere`);
export const maxLength = (value, length) => (value.length <= length ? null : `Maxim ${length} caractere`);
export const sameAs = (value, sourceField, dataObj, schemaObj) => {
    return value == dataObj[sourceField] ? null : `Nu coincide cu ${schemaObj[sourceField]?.title || sourceField}`;
};

const rules = new Map();

rules.set("required", required);
rules.set("email", email);
rules.set("minLength", minLength);
rules.set("maxLength", maxLength);
rules.set("sameAs", sameAs);

export { rules };
