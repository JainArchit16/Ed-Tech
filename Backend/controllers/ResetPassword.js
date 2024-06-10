const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }

    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordToken: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`
    );

    return res.json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed at Sending Mail",
    });
  }
};

//Modify token to expire automatically on time reach

exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    const user = await User.findOne({ token });
    if (!user) {
      return res.json({
        success: false,
        message: "Not Valid Session",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password Doesnot Match",
      });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Session Expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    await mailSender(
      user.email,
      "Password Reset Link",
      passwordUpdated(updated.email, updated.firstName + " " + updated.lastName)
    );

    return res.status(200).json({
      success: true,
      message: "Password Change Successful",
    });
  } catch (err) {
    // console.error(err.message);
  }
};
