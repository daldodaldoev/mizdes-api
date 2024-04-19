const nodemailer = require("nodemailer");

function createTransporter() {
    return nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
}

module.exports.createTransporter = createTransporter;

async function sendEmail({ to, subject, html }) {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
}

module.exports.sendEmail = sendEmail;
