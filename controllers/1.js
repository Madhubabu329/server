generateotp.js
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
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD, // App Password recommended
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
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


otpcontroller.js
const Otp = require("../models/Otp");
const sendEmail = require("../utils/mailer");
const generateOtp = require("../utils/generateOtp");

exports.sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body;
    const { code, hashed } = await generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email },
      { code: hashed, expiresAt },
      { upsert: true, new: true }
    );

    await sendEmail(
      email,
      "Your OTP Code",
      `Hello ${name || ""}, your OTP is: ${code}. It expires in 5 minutes.`
    );

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP error:", err.message);
    res.status(500).json({ message: "Error sending OTP" });
  }
};
