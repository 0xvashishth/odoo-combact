const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const secret_key = process.env["JWT_SECRET"];
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  tokens: [{ token: { type: String } }],
  rentalHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    let newtoken = jwt.sign({ _id: this._id }, secret_key, {
      expiresIn: "30d",
    });
    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (err) {
    console.log(err);
  }
};

UserSchema.methods.getPublicProfile = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    rentalHistory: this.rentalHistory,
  };
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
