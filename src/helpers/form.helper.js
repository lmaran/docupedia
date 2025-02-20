export const setFocus = (formFields) => {
    if (!formFields?.length) return;

    const firstInvalidField = formFields.find((x) => x.hasError);

    if (firstInvalidField) firstInvalidField.hasFocus = true;
    else formFields[0].hasFocus = true;
};

export const setDefaultValues = (inputValues, formFields) => {
    if (!inputValues || !formFields) return;

    formFields.forEach((x) => {
        x.value = inputValues[x.id]; // preserve user-entered values
    });
};
