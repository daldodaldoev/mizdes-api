const Price = require("../models/price");

function getDates() {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 6);

  const format = (date) => date.toISOString().split("T")[0];

  return {
    dfrom: format(today),
    dto: format(endDate),
  };
}

async function fetchToken() {
  const tokenUrl = "https://api.reservationsteps.ru/v1/api/auth";
  const credentials = {
    username: process.env.EMAIL_BINOVO,
    password: process.env.PASSWORD_BINOVO,
  };

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (response.ok) {
      return data.token;
    } else {
      throw new Error(data.message || "Не удалось получить токен");
    }
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    return null;
  }
}

async function fetchAndSavePrices(req, res, next) {
  const { dfrom, dto } = getDates();
  const token = await fetchToken();

  if (!token) {
    console.error("Не удалось получить токен. Отмена запроса.");
    return;
  }

  const url = `https://api.reservationsteps.ru/v1/api/prices?account_id=35750&token=${token}&plan_id=210091&dfrom=${dfrom}&dto=${dto}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка запроса к API цен");

    const data = await response.json();

    const priceEntry = new Price({ prices: data.prices });
    await priceEntry.save();

    const currentTime = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    console.log(`Данные о ценах успешно сохранены. Время: ${currentTime}`);
  } catch (error) {
    next(error);
  }
}

const getLatestPrices = async (req, res, next) => {
  try {
    const latestPrice = await Price.findOne().sort({ createdAt: -1 });

    const grandisData = latestPrice["prices"]["414387"];
    const grandisArray = Object.keys(grandisData).map((day) => {
      return {
        ...grandisData[day],
        day: day,
      };
    });

    const sortedGrandisArray = grandisArray.sort(
      (a, b) => new Date(a.day) - new Date(b.day),
    );

    const rivieraData = latestPrice["prices"]["414388"];
    const rivieraArray = Object.keys(grandisData).map((day) => {
      return {
        ...rivieraData[day],
        day: day,
      };
    });

    const sortedRivieraArray = rivieraArray.sort(
      (a, b) => new Date(a.day) - new Date(b.day),
    );

    const prices = {
      riviera: sortedRivieraArray,
      grandis: sortedGrandisArray,
    };

    res.send(prices);
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchAndSavePrices, getLatestPrices };
