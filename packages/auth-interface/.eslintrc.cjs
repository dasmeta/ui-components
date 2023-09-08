module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    // plugins: [
    //     "@typescript-eslint",
    //     "prettier"
    // ],
    // root: true,
    rules: {
        "@typescript-eslint/ban-ts-comment": 0,
        "no-unsafe-optional-chaining": 0,
        "no-console": 0,
        "no-useless-concat": 2,
        "no-unused-vars": 1,
        "no-use-before-define": 0
    }
};