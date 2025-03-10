export const getDataFromRequestBody = (body, formFields) => {
    if (!body) return null;

    const result = {};
    // Object.keys(body).forEach((key) => {
    //     // const value = req.body[key];
    //     // console.log(`${key}: ${value}`);
    //     result[key] = body[key].trim();
    // });

    formFields.forEach((f) => (result[f.id] = body[f.id]?.trim()));

    return result;
};
