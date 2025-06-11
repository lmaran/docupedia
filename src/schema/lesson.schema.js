// For simplicity, we will keep both entity and form schemas in the same file.
// 1. Entity schemas (presentation + service/business layer)
export const entitySchema = {
    name: {
        label: "Titlul lecției",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    },
    description: {
        label: "Descriere",
        type: "string",
        description: "Doar tu (proprietarul) poți vedea această descriere",
        validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    },
};

// 2. Form schemas (presentation layer - MVC)
export const formSchema = {
    formFields: [{ id: "name" }, { id: "description" }], // put them in the order you want to see them on the screen
};
