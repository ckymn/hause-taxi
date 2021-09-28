require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const trasporter = await nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            secure: true,
            tls: {
                ciphers: 'SSLv3',
            },
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
        })
        await trasporter.sendMail({
            from: process.env.USER,
            to: process.env.USER,
            subject: email,
            text: text
        });
    } catch (error) {
        return error;
    }
}
module.exports = sendEmail;