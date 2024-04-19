const { NODE_ENV, PROD_DATABASE } = process.env;
const JWT_SECRET_KEY = process.env.REACT_APP_JWT_SECRET;
const JWT_SECRET_KEY_DEV = "Hf6xAtYdR6&?9v3K1qWIw<8TBp}2UxX6l]tyg:m?f3tIX8e0iDZ7oj1(d$C!,0G;MVKzab";
const DEV_DATABASE = "mongodb://localhost:27017/mizdesdb";

module.exports = {
    NODE_ENV, PROD_DATABASE, DEV_DATABASE, JWT_SECRET_KEY, JWT_SECRET_KEY_DEV,
};
