const express = require("express");
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
    getCurrentUser,
    loginUser,
    logoutUser,
} = require("../controllers/users");
const { userLogin } = require("../utils/joiSchemes");

router.post("/api/signin", celebrate(userLogin), loginUser);
router.get("/api/signout", auth, logoutUser);
router.get("/api/users/me", auth, getCurrentUser);

module.exports = router;
