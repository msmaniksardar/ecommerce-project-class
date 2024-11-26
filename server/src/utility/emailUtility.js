import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
} from "../config/config.js";
export const sendEmail = (EmailTo, EmailSubject, EmailText) => {
  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    return transporter.sendMail({
      form: "Ecommerce project '<anynoymousmanik@gmail.com>'",
      to: EmailTo,
      subject: EmailSubject,
      text: EmailText,
    });
  } catch (error) {
    throw createHttpError(404, "Failed To Sent Email");
  }
};
