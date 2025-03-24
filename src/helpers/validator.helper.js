import { rules } from "./validator.default-rules.js";

const defaultRules = new Map();

const customRules = new Map();
const customMessages = new Map();

// Register default rules
rules.forEach((key, value) => registerDefaultRule(value, key));

// Maybe you want to call this method from outside (when the application starts)
export function registerDefaultRule(ruleId, validatorFn) {
    if (defaultRules.has(ruleId)) {
        throw new Error(`Rule "${ruleId}" is already registered.`);
    }
    defaultRules.set(ruleId, validatorFn);
}

export function registerCustomRule(ruleId, validatorFn) {
    customRules.set(ruleId, validatorFn);
}

export function registerCustomMessage(ruleId, message) {
    customMessages.set(ruleId, message);
}

export function removeAllCustomRules() {
    customRules.clear();
}

export function removeAllCustomMessages() {
    customMessages.clear();
}

/**
 * Validates a value based on a schema.
 * @param {Object} schema - The validation schema.
 * @param {Object} data - The data to validate.
 * @returns {Object} - Validation result with { isValid: boolean, errors: Object }.
 */
export function validate(data, schema) {
    const errors = {};
    let isValid = true;

    for (const field in schema) {
        const fieldRules = schema[field].validationRules || [];
        const value = data[field];

        for (const ruleObj of fieldRules) {
            const { ruleId, params = [] } = ruleObj;
            const validatorFn = customRules.get(ruleId) || defaultRules.get(ruleId); // check first for custom rules

            if (!validatorFn) {
                throw new Error(`Validation rule "${ruleId}" is not registered.`);
            }

            // We need also "data" and "schema" to reference additional fields în validation functions (e.g. "Nu coincide cu Parola")
            const error = validatorFn(value, ...params, data, schema);
            if (error) {
                isValid = false;

                const messageTemplate =
                    ruleObj.message || // entity-level
                    customMessages.get(ruleId) || // app-level
                    error; // library-level (default message)

                const finalMessage =
                    typeof messageTemplate === "function"
                        ? messageTemplate(value, ...params) // Function-based message
                        : messageTemplate.replace(/\{(\d+)\}/g, (_, index) => params[index] || "");

                errors[field] = finalMessage;
                break; // ignore the remaining rules for the same field
            }
        }
    }

    return { isValid, errors };
}
