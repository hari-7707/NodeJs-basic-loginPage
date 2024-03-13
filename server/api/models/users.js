const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  emailId: mongoose.Schema.Types.String,
  organizationType: mongoose.Schema.Types.String,
  organizationName: mongoose.Schema.Types.String,
  pancardNumber: mongoose.Schema.Types.String,
  phoneNumber: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
});

module.exports = mongoose.model("UserModel", userSchema);
