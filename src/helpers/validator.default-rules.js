// const defaultRules = new Map();

// defaultRules.set("required", (value) => (value ? null : "This field is required."));
// defaultRules.set("email", (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format."));
// defaultRules.set("minLength", (value, length) => (value.length >= length ? null : `Must be at least ${length} characters long.`));
// defaultRules.set("maxLength", (value, length) => (value.length <= length ? null : `Must be at most ${length} characters long.`));

// export { defaultRules };

// Each validation function should return "null" if the value is valid, or an "error message", otherwise.

export const required = (value) => (value ? null : "This field is required.");
export const email = (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format.");
export const minLength = (value, length) => (value.length >= length ? null : `Must be at least ${length} characters long.`);
export const maxLength = (value, length) => (value.length <= length ? null : `Must be at most ${length} characters long.`);
export const identical = () => null;

const rules = new Map();

rules.set("required", required);
rules.set("email", email);
rules.set("minLength", minLength);
rules.set("maxLength", maxLength);
rules.set("identical", identical);

export { rules as defaultRules };
