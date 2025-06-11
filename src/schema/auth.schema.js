// For simplicity, we will keep both entity and form schemas in the same file.
// 1. Entity schemas (presentation + service/business layer)
export const signupEntitySchema = {
    lastName: {
        label: "Nume",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    },
    firstName: {
        label: "Prenume",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    },
    email: { label: "Email", type: "string", validationRules: [{ ruleId: "required" }, { ruleId: "email" }] },
    password: {
        label: "Parola",
        type: "string",
        description: "Minim 6 caractere",
        validationRules: [{ ruleId: "minLength", params: [6], message: "Parola trebuie să aibă minim {0} caractere" }],
    },
    confirmPassword: {
        label: "Confirmă parola",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "sameAs", params: ["password"], message: "Parolele nu coincid" }],
    },
};

// 2. Form schemas (presentation layer - MVC)
export const signupFormSchema = {
    formFields: [{ id: "lastName" }, { id: "firstName" }, { id: "email" }, { id: "password" }, { id: "confirmPassword" }], // put them in the order you want to see them on the screen
};
