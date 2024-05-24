const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_name: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
