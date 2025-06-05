# Validation Rules vs Business Rules vs Form Rules

## Validation Rules

- examples: isNumeric , isValid(email), minLength:8
- are static (usually do not change over time)
- do not depend on the system state (no dependencies)
- can be implemented as pure sync functions
- can be executed both on client and server side (usually în controller)
- always return true/false
- most of them are define in the model (entity schema)

## Business Rules

- examples: isInStock , isUnique(email), hasNoDebts
- are dynamic - can change quite often, as the business evolves
- require async validation
- depend on the system state (have external dependencies)
- should be implemented as async functions
- can be executed only server side (usually in business layer)
- are composed of logical conditions + actions. Ex: if (person has debt) then return validation error (or ask for approval)/
- can return true/false (in this case can be called remotely, from Form rules)
- usually are defined programmatically (it is also possible to serialize them and store then in the model, but it is more difficult)

## Form Rules

- are logical conditions + actions (as Business Rules)
- are executed only at client side an triggered on evens as page load or value change
- are composed of logical conditions and action. Ex: show/hide field, populate dependent lists
- can remotely call some Business Rules. Ex: if (qtyInStock<5) then background-color:yellow
- în REST API we don't have form rules
