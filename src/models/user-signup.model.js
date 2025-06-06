const userModel = {
    lastName: {
        title: "Nume",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    },
    firstName: {
        title: "Prenume",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
    },
    email: { title: "Email", type: "string", validationRules: [{ ruleId: "required" }, { ruleId: "email" }] },
    password: {
        title: "Parola",
        type: "string",
        description: "Minim 6 caractere",
        validationRules: [{ ruleId: "minLength", params: [6], message: "Parola trebuie să aibă minim {0} caractere" }],
    },
    confirmPassword: {
        title: "Confirmă parola",
        type: "string",
        validationRules: [{ ruleId: "required" }, { ruleId: "sameAs", params: ["password"], message: "Parolele nu coincid" }],
    },
    age: {
        title: "Vârsta",
        type: "integer",
        validationRules: [
            { ruleId: "min", params: [18] },
            { ruleId: "max", params: [100] },
        ],
    },
    birthDate: { title: "Data nașterii", type: "date", description: "Data în format dd-mm-yyyy" },
    promoCode: {
        validationRules: [{ ruleId: "startsWith", params: ["PROMO"] }],
    },
};

export default userModel;
