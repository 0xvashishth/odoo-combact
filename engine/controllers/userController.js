const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmailWithSendGrid } = require("../services/mail/mailService");
const {
  userLoginMailScript,
  userRegistrationMailScript,
  userUpdateMailScript,
  userDeleteMailScript,
} = require("../services/mail/mailScript");
const mongoose = require("mongoose");

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists" });

    user = await User.findOne({ phone });
    if (user) return res.status(400).json({ msg: "Phone already exists" });

    user = new User({ name, phone, email, password });
    await user.save();

    const token = await user.generateAuthToken();

    await sendEmailWithSendGrid(
      "You are Successfully Registered",
      [email],
      userRegistrationMailScript(name)
    );

    return res.status(201).json({
      message: "User created successfully!",
      token,
      user: user.getPublicProfile(),
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Invalid credentials(User not found)" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "Invalid credentials(Wrong Password)" });

    const token = await user.generateAuthToken();

    await sendEmailWithSendGrid(
      "Login Attempt",
      [email],
      userLoginMailScript(user.name)
    );

    return res.status(200).json({
      message: "User Logged in successfully!",
      token,
      user: user.getPublicProfile(),
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body.admin;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ error: "Invalid credentials(Admin not found)" });

    const isMatch = password == admin.password;
    if (!isMatch)
      return res
        .status(400)
        .json({ error: "Invalid credentials(Wrong Password)" });

    const token = await admin.generateAuthToken();

    return res.status(200).json({
      message: "Addmin Logged in successfully!",
      token,
      admin: admin.name
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select([
      "-password",
      "-tokens",
    ]);
    return res
      .status(200)
      .json({ message: "User Retrived successfully!", user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.updateProfile = async (req, res, nxt) => {
  const { user } = req.body;
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  const allowedAttributes = ["name", "email", "phone"];
  try {
    const filteredUser = allowedAttributes.reduce((acc, attribute) => {
      if (user.hasOwnProperty(attribute)) {
        acc[attribute] = user[attribute];
      }
      return acc;
    }, {});

    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $set: filteredUser },
      { session }
    );

    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    await sendEmailWithSendGrid(
      "User Profile Updation Attempt",
      [user.email],
      userUpdateMailScript(user.name)
    );
    return res.status(200).json({
      message: "User Updated Successfully!",
    });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};

exports.deleteProfile = async (req, res, nxt) => {
  const session = await mongoose.startSession();
  // starting the mongoose transaction
  session.startTransaction();

  try {
    var user = await User.findByIdAndDelete({ _id: req.userId }, { session });

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    await sendEmailWithSendGrid(
      "User Profile Deleted",
      [user.email],
      userDeleteMailScript(user.name)
    );

    return res.status(200).json({
      message: "User Deleted Successfully!",
    });
  } catch (err) {
    await session.abortTransaction(); // Rollback the transaction
    session.endSession();
    console.error(err.message);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};
