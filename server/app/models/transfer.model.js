const mongoose = require("mongoose");
const Transfer = mongoose.model(
  "Transfer",
  new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: String,
    date: Date
  })
);
module.exports = Transfer;