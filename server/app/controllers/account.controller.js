const db = require("../models");
const User = db.mongoose.model('User', db.user.schema)
const Account = db.mongoose.model('Account', db.account.schema)
const Associate = db.mongoose.model('Associate', db.associate.schema)

exports.getAllAccounts = async (req, res) => {
  // const accounts = await Account.find().populate('role')
  const accounts = await Account.find().populate('userResponsible')
  res.status(200).send(accounts)
};

exports.createAccount = async (req, res) => {
  const account = new Account({
    accountName: req.body.accountName,
    clientName: req.body.clientName,
    userResponsible: req.body.userResponsible._id    
  });
  account.save((err, account) => {
    console.log(account)
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const associate = new Associate({
      user: account.userResponsible,
      account: account._id,
      responsible: true
    })
    associate.save()
    res.send({ message: "The Account was registered successfully!", status: 'success' });
  });
};

exports.updateAccount= async (req, res) => {
  await Account.updateOne({_id: req.params.id }, {
    $set: {
      accountName: req.body.accountName,
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