const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const secret_key = process.env["JWT_SECRET"];
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ token: { type: String } }],
});

AdminSchema.methods.generateAuthToken = async function () {
    try {
      let newtoken = jwt.sign({ _id: this._id }, secret_key, {
        expiresIn: "100d",
      });
      this.tokens = this.tokens.concat({ token: newtoken });
      await this.save();
      return newtoken;
    } catch (err) {
      console.log(err);
    }
  };

module.exports = mongoose.model("Admin", AdminSchema);
