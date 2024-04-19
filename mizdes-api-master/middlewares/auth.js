const jwt = require("jsonwebtoken");
const Error401 = require("../errors/error401");
const {
    NODE_ENV,
    JWT_SECRET_KEY,
    JWT_SECRET_KEY_DEV,
} = require("../config/constants");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            throw new Error401("Токен отсутствует");
        }

        req.user = jwt.verify(
            token,
            NODE_ENV === "production" ? JWT_SECRET_KEY : JWT_SECRET_KEY_DEV,
        );

        next();
    } catch (err) {
        const error401 = new Error401("Токен недействителен");
        next(error401);
    }
};

module.exports = authMiddleware;
