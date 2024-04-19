const mongoose = require("mongoose");
const {
    PROD_DATABASE,
    DEV_DATABASE,
    NODE_ENV,
} = require("./constants");

const connectDB = async () => {
    try {
        await mongoose.connect(NODE_ENV === "production" ? PROD_DATABASE : DEV_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
