require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const connectDB = require("./config/db");
const limiter = require("./utils/rateLimiter");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cron = require("node-cron");
const { fetchAndSavePrices } = require("./controllers/prices");

const PORT = process.env.PORT || 3000;
const app = express();

// cron.schedule("* * * * *", fetchAndSavePrices, {
//   scheduled: true,
//   timezone: "Europe/Moscow",
// });

cron.schedule("0 */4 * * *", fetchAndSavePrices, {
  scheduled: true,
  timezone: "Europe/Moscow",
});

connectDB()
  .then()
  .catch((err) => console.log(err));

app.use(cors);
app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);
app.use(limiter);
app.use(express.json());

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
