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

export const formSchema = {
    formFields: [{ id: "name" }, { id: "description" }], // put them in the order you want to see them on the screen
};
