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
                isUnique: true,
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
        ],
    },
];

export const getByName = (name) => entities.find((x) => x.name == name);
