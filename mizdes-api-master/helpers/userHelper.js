const User = require("../models/user");
const Error404 = require("../errors/error404");
const { userIdNotFound } = require("../locales/messages");

const getUser = async (res, next, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error404(userIdNotFound);
        }

        res.send(user);
    } catch (err) {
        next(err);
    }
};

module.exports = { getUser };
