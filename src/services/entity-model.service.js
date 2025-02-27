// import { getDb, ObjectId } from "../helpers/mongo.helper.js";

// const collectionName = "users";

const entities = [
    {
        name: "user",
        pluralName: "users",
        labelName: "utilizator",
        labelPluralName: "utilizatori",

        formFields2: [
            {
                id: "lastName",
                type: "string", // https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/marketing-fields#field-type-and-format-options

                styles: {
                    label: "Nume",
                    displayType: { type: "multiline", lines: 5 },
                    message: "",
                    autofocus: true,
                },

                validators: {
                    required: true,
                    maxLength: { max: 50, message: "Maxim {{max}} caractere" },
                    minLength: 5,
                },
                transformers: {
                    trim: true, // implicit for all fields
                },
            },
            {
                id: "email",
                type: "string",

                styles: {
                    label: "Email",
                    displayType: "singleline", // implicit pentru string
                    helpText: "We'll never share your email with anyone else.",
                    defaultValue: "The default label shown for the field when you add it to a form.",
                },

                validators: {
                    required: true,
                    isEmail: true,
                    isUnique: true, // custom validator
                },
                transformers: {
                    trim: true,
                    toLowerCase: true,
                },
            },
            {
                id: "confirmPassword",
                type: "string",

                styles: {
                    label: "Confirmă parola",
                    displayType: "singleline", // implicit pentru string
                    helpText: "Minim 6 caractere",
                },

                validators: {
                    required: true,
                    isIdentical: { enabled: true, source: "password", message: `Nu coincide cu {{source}}` },
                },
                transformers: {
                    trim: true,
                    toLowerCase: true,
                },
            },
        ],

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
