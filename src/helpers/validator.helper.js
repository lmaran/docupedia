import { defaultRules } from "./validator.default-rules.js";

const rules = new Map();

// Register default rules
defaultRules.forEach((key, value) => registerRule(value, key));

/**
 * Registers a new validation rule with an optional default error message.
 * @param {string} name - The name of the validation rule.
 * @param {Function} validatorFn - The validation function.
 * @param {string} [defaultMessage] - The default error message template.
 */
export function registerRule(name, validatorFn) {
    if (rules.has(name)) {
        throw new Error(`Rule "${name}" is already registered.`);
    }
    rules.set(name, validatorFn);
}

export function getRules() {
    return rules;
}

/**
 * Validates a value based on a schema.
 * @param {Object} schema - The validation schema.
 * @param {Object} data - The data to validate.
 * @param {Object} [customMessages={}] - Optional global custom error messages per rule.
 * @returns {Object} - Validation result with { isValid: boolean, errors: Object }.
 */
export function validate(data, schema, customMessages = {}) {
    const errors = {};
    let isValid = true;

    for (const field in schema) {
        const fieldRules = schema[field].rules || [];
        const value = data[field];

        for (const ruleObj of fieldRules) {
            const { rule, params = [] } = ruleObj;
            const validatorFn = rules.get(rule);

            if (!validatorFn) {
                throw new Error(`Validation rule "${rule}" is not registered.`);
            }

            const error = validatorFn(value, ...params);
            if (error) {
                isValid = false;

                const messageTemplate =
                    ruleObj.message || // field-level message (highest priority)
                    customMessages[rule] || // global custom message
                    error; // rule-level (default message)

                const finalMessage =
                    typeof messageTemplate === "function"
                        ? messageTemplate(value, ...params) // Function-based message
                        : messageTemplate.replace(/\{(\d+)\}/g, (_, index) => params[index] || "");

                errors[field] = finalMessage;
                break; // ignore the remaining rules for thee same field
            }
        }
    }

    return { isValid, errors };
}
