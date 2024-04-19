const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Error404 = require("../errors/error404");
const Error409 = require("../errors/error409");
const Error401 = require("../errors/error401");

const { getUser } = require("../helpers/userHelper");
const {
    NODE_ENV,
    JWT_SECRET_KEY,
    JWT_SECRET_KEY_DEV,
} = require("../config/constants");
const {
    userNotCreate,
    userIdNotFound,
    successLogin,
    successLogout,
    userEmailError,
    userCredentialsError,
} = require("../locales/messages");

const getCurrentUser = async (req, res, next) => {
    try {
        await getUser(res, next, req.user._id);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const {
            name, email, password,
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        if (!user) {
            throw new Error404(userNotCreate);
        } else {
            res.status(201).send({
                name,
                email,
            });
        }
    } catch (err) {
        if (err.code === 11000) {
            next(new Error409(userEmailError));
        } else {
            next(err);
        }
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true, runValidators: true },
        );
        if (!user) {
            throw new Error404(userIdNotFound);
        }

        res.send(user);
    } catch (err) {
        if (err.code === 11000) {
            next(new Error409(userEmailError));
        } else {
            next(err);
        }
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error401(userCredentialsError);
        }

        const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET_KEY : JWT_SECRET_KEY_DEV, {
            expiresIn: "7d",
        });

        const cookieOptions = {
            httpOnly: true,
            // secure: true,
            // sameSite: true,
            maxAge: 24 * 60 * 60 * 1000,
        };

        res.cookie("jwt", token, cookieOptions);

        res.send({ message: successLogin });
    } catch (err) {
        next(err);
    }
};

const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("jwt").send({ message: successLogout });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    updateUser,
    loginUser,
    logoutUser,
    getCurrentUser,
};
