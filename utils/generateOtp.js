const bcrypt = require("bcryptjs");

// Generate 6-digit OTP and hash it
const generateOtp = async () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(code, salt);
  return { code, hashed };
};

module.exports = generateOtp;


mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password recommended
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    return info;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = sendEmail;
