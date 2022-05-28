const db = require("../models");
const User = db.mongoose.model('User', db.user.schema)
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.superAdminBoard = (req, res) => {
  res.status(200).send("SuperAdmin Content.");
};
exports.getAllUsers = async (req, res) => {
  const users = await User.find()
  
  res.status(200).send(users);
};