const { Segments, Joi } = require("celebrate");
const { isEmail } = require("../helpers/validCheckHelper");

// const bookingBody = {
//   [Segments.BODY]: Joi.object().keys({
//     cottageType: Joi.string().messages({
//       "string.base": 'Поле "cottage_type" должно быть строкой',
//       "string.empty": 'Поле "cottage_type" должно быть заполнено',
//       "any.required": 'Поле "cottage_type" должно быть заполнено',
//     }),
//     name: Joi.string().messages({
//       "string.base": 'Поле "name" должно быть строкой',
//       "string.empty": 'Поле "name" должно быть заполнено',
//       "any.required": 'Поле "name" должно быть заполнено',
//     }),
//     arrivalDate: Joi.string().messages({
//       "string.base": 'Поле "arrivalDate" должно быть строкой',
//       "string.empty": 'Поле "arrivalDate" должно быть заполнено',
//       "any.required": 'Поле "arrivalDate" должно быть заполнено',
//     }),
//     departureDate: Joi.string().messages({
//       "string.base": 'Поле "departureDate" должно быть строкой',
//       "string.empty": 'Поле "departureDate" должно быть заполнено',
//       "any.required": 'Поле "departureDate" должно быть заполнено',
//     }),
//     adults: Joi.number().messages({
//       "number.base": 'Поле "adults" должно быть числом',
//       "any.required": 'Поле "adults" должно быть заполнено',
//     }),
//     children: Joi.number().messages({
//       "number.base": 'Поле "children" должно быть числом',
//       "any.required": 'Поле "children" должно быть заполнено',
//     }),
//     phone: Joi.string()
//       .required()
//       .min(10)
//       .max(12)
//       .pattern(/^[0-9]+$/)
//       .messages({
//         "any.invalid": "Телефонный номер должен содержать от 10 до 12 цифр",
//         "any.required": 'Поле "phone" должно быть заполнено',
//       }),
//     email: Joi.string().messages({
//       "string.base": 'Поле "email" должно быть строкой',
//       "string.empty": 'Поле "email" должно быть заполнено',
//       "any.required": 'Поле "email" должно быть заполнено',
//     }),
//   }),
// };

const bookingBody = {
    [Segments.BODY]: Joi.object()
        .keys({
            phone: Joi.string()
                .pattern(/^\+?[0-9\- ]+$/)
                .min(10)
                .max(18)
                .required()
                .messages({
                    "string.pattern.base": "Поле \"phone\" должно содержать только цифры",
                    "string.min": "Поле \"phone\" должно быть длиной не менее 10 символов",
                    "string.max": "Поле \"phone\" должно быть длиной не более 18 символов",
                    "any.required": "Поле \"phone\" должно быть заполнено",
                }),
        })
        .options({ allowUnknown: true }),
};

const bookingId = {
    [Segments.PARAMS]: Joi.object().keys({
        bookingId: Joi.string().required().hex().messages({
            "string.base": "Поле \"bookingId\" должно быть строкой",
            "string.empty": "Поле \"bookingId\" должно быть заполнено",
            "string.hex":
        "Поле \"bookingId\" должно содержать только шестнадцатеричные символы",
        }),
    }),
};

const bookingUpdate = {
    [Segments.PARAMS]: Joi.object().keys({
        bookingId: Joi.string().required().hex().messages({
            "string.base": "Поле \"bookingId\" должно быть строкой",
            "string.empty": "Поле \"bookingId\" должно быть заполнено",
            "string.hex":
        "Поле \"bookingId\" должно содержать только шестнадцатеричные символы",
        }),
    }),
    [Segments.BODY]: Joi.object()
        .keys({
            phone: Joi.string()
                .pattern(/^\+?[0-9\- ]+$/)
                .min(10)
                .max(18)
                .required()
                .messages({
                    "string.pattern.base": "Поле \"phone\" должно содержать только цифры",
                    "string.min": "Поле \"phone\" должно быть длиной не менее 10 символов",
                    "string.max": "Поле \"phone\" должно быть длиной не более 18 символов",
                    "any.required": "Поле \"phone\" должно быть заполнено",
                }),
        })
        .options({ allowUnknown: true }),
};

const userLogin = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().custom(isEmail).required()
            .messages({
                "string.base": "Поле \"email\" должно быть строкой",
                "string.empty": "Поле \"email\" должно быть заполнено",
                "string.email": "Некорректный Email",
                "any.required": "Поле \"email\" должно быть заполнено",
            }),
        password: Joi.string().required().messages({
            "string.base": "Поле \"password\" должно быть строкой",
            "string.empty": "Поле \"password\" должно быть заполнено",
            "any.required": "Поле \"password\" должно быть заполнено",
        }),
    }),
};

const userCreate = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().custom(isEmail).required()
            .messages({
                "string.base": "Поле \"email\" должно быть строкой",
                "string.empty": "Поле \"email\" должно быть заполнено",
                "string.email": "Некорректный Email",
                "any.required": "Поле \"email\" должно быть заполнено",
            }),
        password: Joi.string().required().messages({
            "string.base": "Поле \"password\" должно быть строкой",
            "string.empty": "Поле \"password\" должно быть заполнено",
            "any.required": "Поле \"password\" должно быть заполнено",
        }),
        name: Joi.string().required().min(2).max(30)
            .messages({
                "string.base": "Поле \"name\" должно быть строкой",
                "string.empty": "Поле \"name\" должно быть заполнено",
                "string.min": "Минимальная длина поля \"name\" - 2",
                "string.max": "Максимальная длина поля \"name\" - 30",
                "any.required": "Поле \"name\" должно быть заполнено",
            }),
    }),
};

const userUpdate = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().required().min(2).max(30)
            .messages({
                "string.base": "Поле \"name\" должно быть строкой",
                "string.empty": "Поле \"name\" должно быть заполнено",
                "string.min": "Минимальная длина поля \"name\" - 2",
                "string.max": "Максимальная длина поля \"name\" - 30",
                "any.required": "Поле \"name\" должно быть заполнено",
            }),
        email: Joi.string().email().custom(isEmail).required()
            .messages({
                "string.base": "Поле \"email\" должно быть строкой",
                "string.empty": "Поле \"email\" должно быть заполнено",
                "string.email": "Некорректный Email",
                "any.required": "Поле \"email\" должно быть заполнено",
            }),
    }),
};

module.exports = {
    bookingBody,
    bookingId,
    userLogin,
    userCreate,
    userUpdate,
    bookingUpdate,
};
