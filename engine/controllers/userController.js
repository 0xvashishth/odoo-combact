const User = require("../models/User");
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
        message: "User created successfully!",
        token,
        user: user.getPublicProfile,
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
        message: "User Logged in successfully!",
        token,
        user: user.getPublicProfile,
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

  const allowedAttributes = [
    "name",
    "email",
    "phone"
  ];
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

    await ChatSession.deleteMany({
      chatID: {
        $in: (await Chat.find({ userID: req.userId })).map((chat) => chat._id),
      },
    });

    await Chat.deleteMany({ agent: req.userId });

    await Url.deleteMany({ userID: req.userId });

    await FormDetails.deleteMany({
      FormID: {
        $in: (await Form.find({ userID: req.userId })).map((form) => form._id),
      },
    });

    await Form.deleteMany({ userID: req.userId });

    await User.findByIdAndDelete({ _id: req.userId });


    await session.commitTransaction(); // Commit the transaction
    session.endSession();

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