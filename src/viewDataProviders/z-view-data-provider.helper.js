/**
[Input]
lessonFormSchema: { formFields: [ { id: 'name' }, { id: 'description' } ] }

lessonEntitySchema: {
  name: {
    label: 'Titlul lecției',
    type: 'string',
    validationRules: [ [Object], [Object] ]
  },
  description: {
    title: 'Descriere',
    type: 'string',
    validationRules: [ [Object], [Object] ]
  }
}

[Output]
formFields: {
  name: {
    id: 'name',
    label: 'Titlul lecției',
    description: undefined,
    required: true
  },
  description: {
    id: 'description',
    label: 'Descriere',
    description: 'Doar tu (proprietarul) poți vedea această descriere',
    required: true
  }
}
*/

export const getFormFields = (lessonFormSchema, lessonEntitySchema, entityData) => {
    const formFields = {};
    lessonFormSchema.formFields.forEach((field) => {
        const fieldId = field.id;
        const fieldSchema = lessonEntitySchema[fieldId];

        const newField = {
            id: fieldId,
            label: fieldSchema.label,
            description: fieldSchema.description,
        };

        const isRequired = fieldSchema?.validationRules?.find((x) => x.ruleId == "required");
        if (isRequired) newField.required = true;

        // In case of validation errors, send data back to the end user
        if (entityData && entityData[fieldId]) {
            newField.value = entityData[fieldId];
        }

        formFields[fieldId] = newField;
    });
    return formFields;
};
