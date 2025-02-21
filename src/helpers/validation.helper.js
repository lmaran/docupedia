import validator from "validator";

const maxCharsForSingleLine = 50;
const maxCharsForMultiLine = 1000 * 1000;
const maxCharsForEmail = 50;

// const isLongerThan = (current, max) => current.length > (max || maxCharsForSingleLine);
// const isLongerThanMessage = (current, max) => `Maxim ${max} caractere`;

// if(isLongerThan("mesaj de test", 10)) console.log(isLongerThanMessage(10));

export const validate = (input, userModel) => {
    let isValid = true; // a general flag that tell us that there is an invalid field on the form

    userModel.fields.forEach((x) => {
        const currentValue = input[x.id];

        if (x.required && !currentValue) x.errorMsg = `Câmp obligatoriu`;
        else if (x.type == "singleLine") {
            if (x.max && currentValue.length > (x.max || maxCharsForSingleLine)) x.errorMsg = `Maxim ${x.max} caractere`;
            else if (x.min && currentValue.length < x.min) x.errorMsg = `Minim ${x.min} caractere`;
            else if (x.mirrorField && currentValue != input[x.mirrorField]) x.errorMsg = `Nu coincide cu valoarea din câmpul "${x.mirrorField}"`;
        } else if (x.type == "multiLine") {
            if (currentValue.length > (x.max || maxCharsForMultiLine)) x.errorMsg = `Maxim ${x.max} caractere`;
            else if (x.min && currentValue.length < x.min) x.errorMsg = `Minim ${x.min} caractere`;
        } else if (x.type == "email") {
            if (currentValue.length > (x.max || maxCharsForEmail)) x.errorMsg = `Maxim ${x.max} caractere`;
            else if (!validator.isEmail(currentValue)) x.errorMsg = `Email invalid`;
            else if (x.isUnique && 1 == 2) x.errorMsg = `Există deja o înregistrare cu această valoare`;
        }

        if (x.errorMsg) {
            x.hasError = true;
            isValid = false;
        }
    });
    return {
        isValid,
        userModel,
    };
};
