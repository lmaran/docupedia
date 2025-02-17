// import { getDb, ObjectId } from "../helpers/mongo.helper.js";

// const collectionName = "users";

export const getFormFields = () => {
    return [
        {
            id: "lastName",
            label: "Nume",
            required: true,
            type: "string",
            max: 50,
        },
        {
            id: "firstName",
            label: "Prenume",
            required: false,
            type: "string",
            max: 50,
            hasError: true,
            errorMsg: "Prenume invalid",
            value: "Lucian",
        },
        {
            id: "email",
            label: "Email",
            required: true,
            type: "email",
            hasFocus: true,
        },
        {
            id: "password",
            label: "Parola",
            required: true,
            type: "string",
            min: "6",
            max: 50,
            helpMsg: "Minim 6 caractere",
        },
        {
            id: "confirmPassword",
            label: "Confirmă parola",
            required: true,
            type: "string",
        },
    ];
};
