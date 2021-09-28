require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, html) => {
  try {
    const trasporter = await nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      secure: true,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await trasporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    return error;
  }
};
module.exports = sendEmail;
