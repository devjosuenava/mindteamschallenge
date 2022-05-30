const db = require("../models");
const User = db.mongoose.model('User', db.user.schema)
const Account = db.mongoose.model('Account', db.account.schema)

exports.getAllAccounts = async (req, res) => {
  // const accounts = await Account.find().populate('role')
  const accounts = await Account.find()
  res.status(200).send(accounts)
};

exports.createAccount = async (req, res) => {
  const account = new Account({
    fullName: req.body.accountName,
    clientName: req.body.clientName,
  });
  account.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err, status: 'error' });
      return;
    }
    res.send({ message: "The Account was registered successfully!", status: 'success' });
  });
};

exports.updateAccount= async (req, res) => {
  await Account.updateOne({_id: req.params.id }, {
    $set: {
      fullName: req.body.accountName,
      clientName: req.body.clientName
    }
  })
  res.status(200).send({ message: 'The Account was updated successfully', status: 'success' })
};

exports.deleteAccount = async (req, res) => {
  await Account.deleteOne({ _id: req.params.id}).then(
    res.status(200).send({ message: 'The Account was deleted successfully', status: 'success' })
  )
};