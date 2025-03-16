export const setFocus = (formFields) => {
    if (!formFields?.length) return;

    const newFormFields = formFields.map((x) => ({ ...x })); // immutable

    const firstInvalidField = newFormFields.find((x) => x.hasError);

    if (firstInvalidField) firstInvalidField.hasFocus = true;
    else newFormFields[0].hasFocus = true;

    return newFormFields;
};

export const setDefaultValues = (inputValues, formFields) => {
    if (!inputValues || !formFields) return;

    formFields.forEach((x) => {
        x.value = inputValues[x.id]; // preserve user-entered values
    });
};

// const demo = {
//     formFields: [
//         {
//             id: "lastName",
//             label: "Nume",
//             type: "string",
//             displayAs: "singleLine",
//             helpMsg: "Minim 6 caractere",
//             required: true,
//             hasFocus: true,
//             value: "[oldValue]"
//         },
//     ],
// };

export const setViewData = (data, errors) => {
    // if (!inputValues || !formFields) return;

    formFields.forEach((x) => {
        x.value = inputValues[x.id]; // preserve user-entered values
    });
};
