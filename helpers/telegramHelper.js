const axios = require("axios");
const { formatDate } = require("./formatDate");

const sendTelegramMessage = async (chatId, booking) => {
    const token = process.env.TELEGRAM_TOKEN;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const additionalString = booking.additional?.join(", ") || "не указано";

    const newBooking = `Коттедж: ${booking.cottage || "любой"}
Доп.услуги: ${additionalString}
Пожелания : ${booking.wishes || "не указано"}
Дата заезда: ${booking.arrivalDate || "не указано"}
Дата выезда: ${booking.departureDate || "не указано"}
Взрослые: ${booking.adults || "не указано"}
Дети: ${booking.kids || "не указано"}
Имя: ${booking.name || "не указано"}
Телефон: ${booking.phone || "не указано"}
Почта: ${booking.email || "не указано"}`;

    const formattedDate = formatDate(booking.createdAt);

    const messageText = `Новое бронирование:\n\n${newBooking}\n\nДата бронирования: ${formattedDate}`;

    try {
        const response = await axios.post(url, {
            chat_id: chatId,
            text: messageText,
        });

        return response.data.ok;
    } catch (error) {
        console.error("Error sending message to Telegram:", error);
        throw error;
    }
};

module.exports.sendTelegramMessage = sendTelegramMessage;
