// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // App Password recommended
//   },
// });

// const sendEmail = async (to, subject, text) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     });
//     return info;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// module.exports = sendEmail;





const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,              // MUST be 465 on Render
  secure: true,           // true for port 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD, // MUST be Gmail App Password
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email sending failed:", err.message);
    throw new Error("Email failed");
  }
}

module.exports = sendEmail;
