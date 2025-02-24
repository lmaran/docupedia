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

const isRequiredMessage = () => `Câmp obligatoriu`;
const isLongerThanDefaultMessage = () => `Maxim ${maxCharsDefault} caractere`;
const isLongerThanMessage = (max) => `Maxim ${max} caractere`;
const isShorterThanMessage = (min) => `Minim ${min} caractere`;
const isNotAnEmailMMessage = () => `Email invalid`;
const isDifferentFromMirrorMessage = (crt, mirror) => `Nu coincide cu valoarea din câmpul "${mirror}"`;
const isNotUniqueMMessage = () => `Există deja o înregistrare cu această valoare`;

export const validate = async (input, userModel) => {
    let isValid = true; // a general flag that tell us that there is an invalid field on the form

    //console.log(userModel.formFields);

    // userModel.formFields.forEach((x) => {
    for (const x of userModel.formFields) {
        const currentValue = input[x.id];

        // All fields
        if (x.required && isEmpty(currentValue)) x.errorMsg = isRequiredMessage();
        else if (isLongerThanDefault(currentValue)) x.errorMsg = isLongerThanDefaultMessage();
        // Specific fields
        else if (x.type == "singleLine") {
            if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
            else if (x.min && isShorterThan(currentValue, x.min)) x.errorMsg = isShorterThanMessage(x.min);
            else if (x.mirrorField && isDifferentFromMirror(currentValue, input[x.mirrorField]))
                x.errorMsg = isDifferentFromMirrorMessage(x.mirrorField);
        } else if (x.type == "multiLine") {
            if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
            else if (x.min && isShorterThan(currentValue, x.min)) x.errorMsg = isShorterThanMessage(x.min);
        } else if (x.type == "email") {
            if (isNotAnEmail(currentValue)) x.errorMsg = isNotAnEmailMMessage();
            else if (x.isUnique && (await isNotUnique(currentValue))) x.errorMsg = isNotUniqueMMessage();
        }

        if (x.errorMsg) {
            x.hasError = true;
            isValid = false;
        }
    }
    return {
        isValid,
        userModel,
    };
};
