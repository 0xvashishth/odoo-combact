const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    return res
      .status(201)
      .json({
        success: "User created successfully!",
        token,
        profile: user.getPublicProfile,
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

    return res
      .status(200)
      .json({
        success: "User Logged in successfully!",
        token,
        profile: user.getPublicProfile,
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select([
      "-password",
      "-tokens",
    ]);
    return res
      .status(200)
      .json({ success: "User Retrived successfully!", profile });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
