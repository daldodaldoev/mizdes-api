const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Поле \"name\" должно быть заполнено"],
            minlength: [2, "Минимальная длина поля \"name\" - 2"],
            maxlength: [30, "Максимальная длина поля \"name\" - 30"],
        },
        email: {
            type: String,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: "Некорректный Email",
            },
            required: [true, "Поле \"email\" должно быть заполнено"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Поле \"password\" должно быть заполнено"],
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = mongoose.model("user", userSchema);
