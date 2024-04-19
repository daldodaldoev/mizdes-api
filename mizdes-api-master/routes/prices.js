const express = require("express");

const router = express.Router();
const { getLatestPrices } = require("../controllers/prices");

router.get("/api/prices", getLatestPrices);

module.exports = router;
