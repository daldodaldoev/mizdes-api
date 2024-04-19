const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        cottage: {
            type: String,
        },
        name: {
            type: String,
        },
        arrivalDate: {
            type: String,
        },
        departureDate: {
            type: String,
        },
        adults: {
            type: Number,
        },
        kids: {
            type: Number,
        },
        phone: {
            type: String,
            required: [true, "Поле \"phone\" должно быть заполнено"],
        },
        email: {
            type: String,
        },
        wishes: {
            type: String,
        },
        additional: {
            type: [String],
            enum: [
                "Ранний заезд",
                "Поздний выезд",
                "Мангал",
                "Баня",
                "Детская кроватка",
                "Детский стульчик для кормления",
                "Ароматная соль",
                "Бомбочка для ванны",
            ],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = mongoose.model("booking", bookingSchema);
