// import { getDb, ObjectId } from "../helpers/mongo.helper.js";

// const collectionName = "users";

export const getFormFields = () => {
    return [
        {
            id: "lastName",
            type: "singleLine",
            label: "Nume",
            required: true,
            max: 50,
            min: 5,
        },
        {
            id: "firstName",
            type: "singleLine",
            label: "Prenume",
            required: false,
            max: 50,
            min: 5,
            value: "Lucian",
        },
        {
            id: "email",
            type: "email",
            label: "Email",
            required: true,
        },
        {
            id: "password",
            type: "singleLine",
            label: "Parola",
            required: true,
            min: "6",
            max: 50,
            helpMsg: "Minim 6 caractere",
        },
        {
            id: "confirmPassword",
            type: "singleLine",
            label: "Confirmă parola",
            required: true,
            mirrorField: "password",
        },
    ];
};
