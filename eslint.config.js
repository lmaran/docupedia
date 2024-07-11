import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
    js.configs.recommended, // load recommended settings
    eslintConfigPrettier, // put it after other configs that you want to override.
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.node, // to prevent 'console' or 'process' is not defined, specify that you are in an environment where 'console' indeed exists
            },
        },
        rules: {
            "no-var": "error", // use 'let' instead of 'var'
            "prefer-const": ["error", { ignoreReadBeforeAssign: true }], // prefer 'const' if a variable is never reassigned
        },
    },
];
