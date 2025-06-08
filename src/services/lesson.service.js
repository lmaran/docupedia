// import * as lessonRepository from "../repositories/lesson.repository.js";
import { lessonRepository } from "../repositories/lesson.repository.js";
import * as lessonValidation from "../validation/lesson.validation.js";

export const getAll = async () => {
    return await lessonRepository.getAll();
};

export const getOneById = async (lessonId) => {
    return await lessonRepository.getOneById(lessonId);
};

export const insertOne = async (item) => {
    //     const validationResult = await lessonValidation.validate(item);
    //     if (!validationResult.isValid) return validationResult;

    const insertedId = await lessonRepository.insertOne(item);
    return { isValid: true, result: insertedId };
};

export const updateOne = async (item) => {
    const validationResult = await lessonValidation.validate(item);
    if (!validationResult.isValid) return validationResult;

    const matchedCount = await lessonRepository.updateOne(item);
    return { isValid: true, result: matchedCount };
};

export const deleteOneById = async (id) => {
    return await lessonRepository.deleteOneById(id);
};

export const getFormData = (entityData, errors) => {
    // const formFields = getFormFields(entityMeta, formId);

    const formFields = [{ id: "name" }, { id: "description" }];

    const formData = { formFields: [] };

    const lessonSchema = {
        name: {
            title: "Nume",
            type: "string",
            validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
        },
        description: {
            title: "Prenume",
            type: "string",
            validationRules: [{ ruleId: "required" }, { ruleId: "minLength", params: [5] }],
        },
    };

    formFields.forEach((field) => {
        const fieldId = field.id;

        const fieldSchema = lessonSchema[fieldId];

        const newField = { id: fieldId, title: fieldSchema?.title, description: fieldSchema?.description };

        const isRequired = fieldSchema?.validationRules?.find((x) => x.ruleId == "required");
        if (isRequired) newField.required = true;

        // In case of validation errors, send data back to the end user
        if (entityData && entityData[fieldId]) {
            newField.value = entityData[fieldId];
        }

        if (errors && errors[fieldId]) {
            newField.hasError = true;
            newField.message = errors[fieldId];
        }

        formData.formFields.push(newField);
    });

    // Set focus
    const firstInvalidField = formData.formFields.find((x) => x.hasError);

    if (firstInvalidField) firstInvalidField.hasFocus = true;
    else formData.formFields[0].hasFocus = true;

    // formFields= [
    //     {
    //         id: "lastName",
    //         label: "Nume",
    //         required: true,
    //     }]
    return formData;
};
