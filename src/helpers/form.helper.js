export const setFocus = (formFields, isValid) => {
    let firstField = null;
    // if (isValid) firstField = formFields.find((x) => !x.isDisabled);
    if (isValid) firstField = formFields[0];
    else firstField = formFields.find((x) => x.hasError);

    firstField.hasFocus = true;
};

export const preserveInputValues = (input, formFields) => {
    formFields.forEach((x) => {
        x.value = input[x.id]; // preserve user-entered values
    });
    return formFields;
};
