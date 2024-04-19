module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: "airbnb-base",
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        indent: [
            "error",
            4,
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        quotes: [
            "error",
            "double",
        ],
        semi: [
            "error",
            "always",
        ],
        "no-underscore-dangle": ["error", { allow: ["_id"] }],
    },
};
