const validator = require("validator");

const isURL = (value, helpers) => {
    if (!validator.isURL(value)) {
        return helpers.error("Некорректный URL");
    }
    return value;
};

const isEmail = (value, helpers) => {
    if (!validator.isEmail(value)) {
        return helpers.error("Некорректный Email");
    }
    return value;
};

module.exports = { isURL, isEmail };
