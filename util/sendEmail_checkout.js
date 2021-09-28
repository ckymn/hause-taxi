require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = async (email, subject, data) => {
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

        await trasporter.use('compile', hbs({
            viewEngine: {
                extname: ".hbs",
                layoutsDir: "./views",
                defaultLayout: "index",
                partialsDir: "./views"
            },
            viewPath: "./views",
            extName: ".hbs"
        }));

        await trasporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: "HAUSETAXI BOOKING",
            template: 'index',
            context: {
                order: data[0],
                booking: data[1],
            }
        });
    } catch (error) {
        return console.log("SendEmailCheckout Error", error);
    }
}
module.exports = sendEmail;