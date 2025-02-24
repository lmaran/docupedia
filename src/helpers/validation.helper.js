import validator from "validator";

const maxCharsForSingleLine = 50;
const maxCharsForMultiLine = 1000 * 1000;
const maxCharsForEmail = 50;

const isEmpty = (crt) => !crt;
const isLongerThan = (crt, max) => crt.length > (max || maxCharsForSingleLine);
const isShorterThan = (crt, min) => crt.length < min;
const isNotAnEmail = (crt) => !validator.isEmail(crt);
const isDifferentFromMirror = (crt, mirror) => crt != mirror;
const isNotUnique = (crt) => 1 == 2; // TODO

const isRequiredMessage = () => `Câmp obligatoriu`;
const isLongerThanMessage = (max) => `Maxim ${max} caractere`;
const isShorterThanMessage = (min) => `Minim ${min} caractere`;
const isNotAnEmailMMessage = () => `Email invalid`;
const isDifferentFromMirrorMessage = (crt, mirror) => `Nu coincide cu valoarea din câmpul "${mirror}"`;
const isNotUniqueMMessage = () => `Există deja o înregistrare cu această valoare`;

export const validate = (input, userModel) => {
    let isValid = true; // a general flag that tell us that there is an invalid field on the form

    userModel.fields.forEach((x) => {
        const currentValue = input[x.id];

        if (x.required && isEmpty(currentValue)) x.errorMsg = isRequiredMessage();
        else if (x.type == "singleLine") {
            if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
            else if (x.min && isShorterThan(currentValue, x.min)) x.errorMsg = isShorterThanMessage(x.min);
            else if (x.mirrorField && isDifferentFromMirror(currentValue, input[x.mirrorField]))
                x.errorMsg = isDifferentFromMirrorMessage(x.mirrorField);
        } else if (x.type == "multiLine") {
            if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
            else if (x.min && isShorterThan(currentValue, x.min)) x.errorMsg = isShorterThanMessage(x.min);
        } else if (x.type == "email") {
            if (x.max && isLongerThan(currentValue, x.max)) x.errorMsg = isLongerThanMessage(x.max);
            else if (isNotAnEmail(currentValue)) x.errorMsg = isNotAnEmailMMessage();
            else if (x.isUnique && isNotUnique(currentValue)) x.errorMsg = isNotUniqueMMessage();
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
