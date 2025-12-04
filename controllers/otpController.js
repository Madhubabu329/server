// const Otp = require("../models/Otp");
// const sendEmail = require("../utils/mailer");
// const generateOtp = require("../utils/generateOtp");

// exports.sendOtp = async (req, res) => {
//   try {
//     const { email, name } = req.body;
//     const { code, hashed } = await generateOtp();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     await Otp.findOneAndUpdate(
//       { email },
//       { code: hashed, expiresAt },
//       { upsert: true, new: true }
//     );

//     await sendEmail(
//       email,
//       "Your OTP Code",
//       `Hello ${name || ""}, your OTP is: ${code}. It expires in 5 minutes.`
//     );

//     res.json({ message: "OTP sent successfully" });
//   } catch (err) {
//     console.error("OTP error:", err.message);
//     res.status(500).json({ message: "Error sending OTP" });
//   }
// };



const Otp = require("../models/Otp");
const sendEmail = require("../utils/mailer");
const generateOtp = require("../utils/generateOtp");

exports.sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate OTP
    const { code, hashed } = await generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save or update OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { code: hashed, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP email
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
