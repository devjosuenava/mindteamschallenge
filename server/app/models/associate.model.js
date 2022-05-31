const mongoose = require("mongoose");
const Associate = mongoose.model(
  "Associate",
  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    responsible: Boolean    
  })
);
module.exports = Associate;