import { readFile } from "fs/promises";
// import { getDb, ObjectId } from "../helpers/mongo.helper.js";

// const collectionName = "users";

const validators = {
    type: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
    required: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
    identical: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
    email: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
    lowercase: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
};

const validatorsAsync = {
    unique: async function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
};

const customValidators = {
    cnp: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
};
const customValidatorsAsync = {
    temperature: function (v, msg) {
        return { isValid: true, message: msg || "" };
    },
};

const userValidationResult = {
    isValid: false,
    errors: {
        lastName: "Câmp obligatoriu",
        email: "Email invalid",
        confirmPassword: "Nu coincide cu parola",
    },
};
const userSchema = getUserSchema();

const userEntity = {
    schema: userSchema,
    transformers: {
        trim: true, // implicit for all fields
        toLowerCase: true,
    },
};

const entities = [
    userEntity,
    {
        name: "user",
        pluralName: "users",
        labelName: "utilizator",
        labelPluralName: "utilizatori",

        fieldsDemo: {
            confirmPassword: {
                type: "string", // https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/marketing-fields#field-type-and-format-options

                styles: {
                    label: "Nume",
                    displayType: { type: "multiline", lines: 5 },
                    helpText: "Minim 6 caractere",
                    defaultValue: "N/A",
                    autofocus: true,
                },

                validators: {
                    required: true,
                    maxLength: { max: 50, message: "Maxim {{max}} caractere" },
                    minLength: 5,
                    enum: ["Coffee", "Tea"],
                    isEmail: true,
                    isUnique: true, // custom validator
                    isIdentical: { enabled: true, source: "password", message: `Nu coincide cu {{$.password}}` },
                },
                transformers: {
                    trim: true, // implicit for all fields
                    toLowerCase: true,
                },
            },
        },

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

export const getUserSchema = async () => {
    const data = await readFile("./user.schema.json", "utf-8");
    return JSON.parse(data);
};

export const getByName = (name) => entities.find((x) => x.name == name);
