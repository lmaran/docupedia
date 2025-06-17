import { rules, messages } from "./validation-rules.js";

/**
 * Validates a value based on a schema.
 * @param {Object} data - The data to validate.
 * @param {Object} schema - The validation schema.
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
            const validatorFn = rules.get(ruleId);

            if (!validatorFn) {
                throw new Error(`Validation rule "${ruleId}" is not registered.`);
            }

            // We also need "data" and "schema" to reference additional fields în validation functions (e.g. "Nu coincide cu Parola")
            if (!validatorFn(value, ...params, data, schema)) {
                isValid = false;

                const messageTemplate =
                    ruleObj.message || // entity-level
                    messages.get(ruleId) || // library-level (default message)
                    "Câmp invalid";

                // String interpolation. E.g.: [6, "Minim {0} caractere"] => "Minim 6 caractere"
                const message = messageTemplate.replace(/\{(\d+)\}/g, (_, index) => params[index] || "");

                errors[field] = message;
                break; // ignore the remaining rules for the same field
            }
        }
    }

    return { isValid, errors };
}
