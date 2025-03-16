import validator from "validator";
import { userService } from "../services/user.service.js";

const maxCharsDefault = 1000 * 1000;

const isEmpty = (crt) => !crt;
const isLongerThanDefault = (crt) => crt.length > maxCharsDefault;
const isLongerThan = (crt, max) => crt.length > max;
const isShorterThan = (crt, min) => crt.length < min;
const isNotAnEmail = (crt) => !validator.isEmail(crt);
const isDifferentFromMirror = (crt, mirror) => crt != mirror;
const isNotUnique = async (email) => {
    const existingUser = await userService.getOneByEmail(email);
    if (existingUser) return true;
};

// https://formvalidation.io/guide/examples/creating-a-custom-validator/
const emailValidator = function () {
    return {
        validate: function (input) {
            const value = input.value;

            if (!validator.isEmail(value)) {
                return {
                    isValid: false,
                    message: "Email invalid",
                };
            }

            return {
                isValid: true,
            };
        },
    };
};

// const validateEmail = async (currentValue) => {
//     const isValid = true,
//         message = "";

//     if (isNotAnEmail(currentValue)) x.errorMsg = isNotAnEmailMMessage();
//     else if (x.isUnique && (await isNotUnique(currentValue))) x.errorMsg = isNotUniqueMMessage();

//     return {
//         isValid,
//         message,
//     };
// };

const isRequiredMessage = () => `Câmp obligatoriu`;
const isLongerThanDefaultMessage = () => `Maxim ${maxCharsDefault} caractere`;
const isLongerThanMessage = (max) => `Maxim ${max} caractere`;
const isShorterThanMessage = (min) => `Minim ${min} caractere`;
const isNotAnEmailMMessage = () => `Email invalid`;
const isDifferentFromMirrorMessage = (crt, mirror) => `Nu coincide cu valoarea din câmpul "${mirror}"`;
const isNotUniqueMMessage = () => `Există deja o înregistrare cu această valoare`;

export const validate = async (data, schema) => {
    const isValid = true; // a general flag that tell us that there is an invalid field on the form

    //console.log(userModel.formFields);

    const errors = []; // {field:"firstName", message:"Câmp obligatoriu"}

    const objectSchema = schema.properties;

    // userModel.formFields.forEach((x) => {
    for (const propertyName of objectSchema) {
        const currentValue = data[propertyName];

        // All properties
        const propertySchema = objectSchema[propertyName];

        if (propertySchema.required && isEmpty(currentValue)) {
            errors.push({ field: propertyName, message: isRequiredMessage() });
            continue;
        }

        // if (x.required && isEmpty(currentValue)) x.errorMsg = isRequiredMessage();
        // else if (isLongerThanDefault(currentValue)) x.errorMsg = isLongerThanDefaultMessage();
        // // Specific fields
        // else if (x.type == "singleLine") {
        //     if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
        //     else if (x.min && isShorterThan(currentValue, x.min)) x.errorMsg = isShorterThanMessage(x.min);
        //     else if (x.mirrorField && isDifferentFromMirror(currentValue, data[x.mirrorField]))
        //         x.errorMsg = isDifferentFromMirrorMessage(x.mirrorField);
        // } else if (x.type == "multiLine") {
        //     if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
        //     else if (x.min && isShorterThan(currentValue, x.min)) x.errorMsg = isShorterThanMessage(x.min);
        // } else if (x.type == "email") {
        //     if (isNotAnEmail(currentValue)) x.errorMsg = isNotAnEmailMMessage();
        //     else if (x.isUnique && (await isNotUnique(currentValue))) x.errorMsg = isNotUniqueMMessage();
        // }

        // if (x.errorMsg) {
        //     x.hasError = true;
        //     isValid = false;
        // }
    }

    return {
        isValid,
        // formFields: userModel.formFields,
        errors,
    };
};
