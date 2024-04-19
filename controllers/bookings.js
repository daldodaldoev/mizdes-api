const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");
const Booking = require("../models/booking");
const Error404 = require("../errors/error404");
const {
    bookingNotCreate,
    bookingIdNotFound,
    bookingDelete,
} = require("../locales/messages");
const { sendEmail } = require("../helpers/emailHelper");
const { formatDate } = require("../helpers/formatDate");
const { sendTelegramMessage } = require("../helpers/telegramHelper");

const templateString = fs.readFileSync(
    path.join(__dirname, "../template/template.hbs"),
    "utf-8",
);
const template = handlebars.compile(templateString);

const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (err) {
        next(err);
    }
};

const getLatestBookings = async (req, res, next) => {
    try {
        const latestRivieraBookings = await Booking.find({ cottage: "riviera" })
            .sort({ createdAt: -1 })
            .limit(10);
        const latestGrandisBookings = await Booking.find({ cottage: "grandis" })
            .sort({ createdAt: -1 })
            .limit(10);

        const bookings = [...latestRivieraBookings, ...latestGrandisBookings];
        res.send(bookings);
    } catch (err) {
        next(err);
    }
};

const updateBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const {
            cottage,
            name,
            arrivalDate,
            departureDate,
            adults,
            kids,
            phone,
            email,
            wishes,
            additional,
        } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                cottage,
                name,
                arrivalDate,
                departureDate,
                adults,
                kids,
                phone,
                email,
                wishes,
                additional,
            },
            { new: true, runValidators: true },
        );
        if (!booking) {
            throw new Error404(bookingIdNotFound);
        }

        res.send({ message: "Бронирование обновлено", booking });
    } catch (err) {
        next(err);
    }
};

const createBooking = async (req, res, next) => {
    try {
        const {
            cottage,
            name,
            arrivalDate,
            departureDate,
            adults,
            kids,
            phone,
            email,
            wishes,
            additional,
        } = req.body;

        const booking = await Booking.create({
            cottage,
            name,
            arrivalDate,
            departureDate,
            adults,
            kids,
            phone,
            email,
            wishes,
            additional,
        });

        if (!booking) {
            throw new Error404(bookingNotCreate);
        } else {
            const additionalString = booking.additional?.join(", ") || "не указано";

            const html = template({
                cottage: `${booking.cottage || "любой"}`,
                arrivalDate: `${booking.arrivalDate || "не указано"}`,
                departureDate: `${booking.departureDate || "не указано"}`,
                adults: `${booking.adults || "не указано"}`,
                kids: `${booking.kids || "не указано"}`,
                name: `${booking.name || "не указано"}`,
                phone: `${booking.phone}`,
                email: `${booking.email || "не указано"}`,
                additional: additionalString,
                wishes: `${booking.wishes || "не указано"}`,
                date: `${formatDate(booking.createdAt)}`,
            });

            const emailData = {
                to: process.env.EMAIL_USERNAME,
                subject: "Новое бронирование",
                html,
            };

            try {
                await sendEmail(emailData);
                await sendTelegramMessage(-4025896495, booking);
                res.status(201).send({
                    message:
            "Благодарим за бронирование. Наш менеджер скоро свяжется с вами",
                });
            } catch (error) {
                res.status(500).send({
                    message: "Ошибка при создании бронирования или отправке письма",
                });
            }
        }
    } catch (err) {
        next(err);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            throw new Error404(bookingIdNotFound);
        }

        await booking.deleteOne();

        res.send({ message: bookingDelete });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBookings,
    createBooking,
    deleteBooking,
    updateBooking,
    getLatestBookings,
};
