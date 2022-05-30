const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(200).send({ message: "Failed! Email is already in use!", status: 'error' });
      return;
    }
    next();
  });
};
checkRoleExists = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: `Failed! Role ${req.body.role} does not exist!`, status: 'error'
      });
      return;
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateEmail,
  checkRoleExists
};
module.exports = verifySignUp;