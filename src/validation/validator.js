import { rules, messages } from "./validation-rules.js";
import { ErrorTypes } from "../errors/errorTypes.js";

/**
 * Validates a value based on a schema.
 * result = { success: boolean, error: { type: "VALIDATION_ERROR", details: {} } }.
 */
export function validate(data, schema) {
    const result = { success: true };
    const details = {};

    for (const field in schema) {
        const allRuleIds = [...rules.keys()];
        const fieldRules = getFieldRules(schema[field], allRuleIds); // getFieldRules(schema[field]);
        const value = data[field];

        for (const ruleObj of fieldRules) {
            const { ruleId, params = [] } = ruleObj;
            const validatorFn = rules.get(ruleId);

            if (!validatorFn) {
                throw new Error(`Validation rule "${ruleId}" is not registered.`);
            }

            // We also need "data" and "schema" to reference additional fields în validation functions (e.g. "Nu coincide cu Parola")
            if (!validatorFn(value, ...params, data, schema)) {
                result.success = false;

                const messageTemplate =
                    ruleObj.message || // entity-level
                    messages.get(ruleId) || // library-level (default message)
                    "Câmp invalid";

                // String interpolation. E.g.: [6, "Minim {0} caractere"] => "Minim 6 caractere"
                const message = messageTemplate.replace(/\{(\d+)\}/g, (_, index) => params[index] || "");

                details[field] = message;
                break; // ignore the remaining rules for the same field
            }
        }
    }

    if (!result.success) result.error = { type: ErrorTypes.VALIDATION_ERROR, details };

    return result;
}

const getFieldRules = (fieldAttributes, allRuleIds) => {
    const fieldRules = [];

    allRuleIds.forEach((ruleId) => {
        if (fieldAttributes[ruleId]) {
            const rule = getNormalizedBuiltInRule(ruleId, fieldAttributes[ruleId]);
            fieldRules.push(rule);
        }
    });

    return fieldRules;
};

// Indiferent de input, produce același output. Exemplu:
// Input 1: required: true
// Input 2: required: [true, "Câmp obligatoriu"]
// Output: { ruleId: "required", params:[true], message:"undefind/Câmp obligatoiru" }
export const getNormalizedBuiltInRule = (ruleId, ruleValue) => {
    // nefolosit și netestat (vezi mongoose)
    if (ruleId === "enum" && typeof rule === "object" && ruleValue.values) {
        return {
            ruleId,
            params: ruleValue.values,
            message: ruleValue.message || `${ruleId} failed`,
        };
    }

    if (Array.isArray(ruleValue)) {
        const [value, message] = ruleValue; // primul element din array este considerat parametru, iar al 2-lea este considerat "message"
        return {
            ruleId,
            params: [value],
            message: message,
        };
    }

    // nefolosit și netestat (vezi mongoose)
    if (ruleValue instanceof RegExp) {
        return {
            ruleId,
            params: [ruleValue.toString()],
            message: `${ruleId} pattern mismatch`,
        };
    }

    // Primitive values: bool, string, int
    return {
        ruleId,
        params: [ruleValue],
    };
};
