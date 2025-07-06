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

export const getFormFields = (formSchema, entitySchema) => {
    const formFields = {};
    formSchema.formFields.forEach((field) => {
        const fieldId = field.id;
        const fieldSchema = entitySchema[fieldId];

        const newField = {
            id: fieldId,
            label: fieldSchema.label,
            description: fieldSchema.description,
        };

        if (fieldSchema.required) newField.required = true;

        formFields[fieldId] = newField;
    });
    return formFields;
};
