const mongoose = require("mongoose");
const Account = mongoose.model(
  "Account",
  new mongoose.Schema({
    accountName: String,
    clientName: String,
    userResponsible: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  })
);
module.exports = Account;