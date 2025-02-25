// import { getDb, ObjectId } from "../helpers/mongo.helper.js";

// const collectionName = "users";

const entities = [
    {
        name: "user",
        pluralName: "users",
        labelName: "utilizator",
        labelPluralName: "utilizatori",

        formFields: [
            {
                id: "lastName",
                label: "Nume",
                type: "string",
                required: true,
                max: 50,
                min: 5,
            },
            {
                id: "firstName",
                label: "Prenume",
                type: "string",
                required: false,
                max: 50,
                min: 5,
                value: "Lucian",
            },
            {
                id: "email",
                label: "Email",
                type: "string",
                isEmail: true,
                isMultiline: false,
                required: true,
                isUnique: true,
                lowercase: true,
            },
            {
                id: "password",
                label: "Parola",
                type: "string",
                required: true,
                min: 6,
                max: 50,
                helpMsg: "Minim 6 caractere",
            },
            {
                id: "confirmPassword",
                label: "Confirmă parola",
                type: "string",
                required: true,
                mirrorField: "password",
            },
        ],
    },
];

export const getByName = (name) => entities.find((x) => x.name == name);
