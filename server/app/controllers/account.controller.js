const db = require("../models");
const { findOneAndDelete } = require("../models/user.model");
const Account = db.mongoose.model('Account', db.account.schema)
const Associate = db.mongoose.model('Associate', db.associate.schema)

exports.getAllAccounts = async (req, res) => {
  const accounts = await Account.find().populate('userResponsible')
  res.status(200).send(accounts)
};

exports.createAccount = async (req, res) => {
  const account = new Account({
    accountName: req.body.accountName,
    clientName: req.body.clientName,
    userResponsible: req.body.userResponsible._id ? req.body.userResponsible._id : null
  });
  account.save((err, account) => {
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
  let account = await Account.findOne({ _id: req.params.id })
  if (account.accountName !==req.body.accountName) account.accountName = req.body.accountName
  if (account.clientName !== req.body.clientName) account.clientName = req.body.clientName
  if (account.toObject().hasOwnProperty('userResponsible')) {
    if(account.userResponsible._id.toString() !== req.body.userResponsible._id){
      await Associate.findOneAndDelete({ account: account._id })
      account.userResponsible = req.body.userResponsible
      const associate = new Associate({
        user: account.userResponsible,
        account: account._id,
        responsible: true
      })
      associate.save().then('created')
    }
  } else {
    account.userResponsible = req.body.userResponsible
    const associate = new Associate({
      user: account.userResponsible,
      account: account._id,
      responsible: true
    });
    associate.save()
  }
  await Account.updateOne({ _id: req.params.id }, {
    $set: {
      accountName: account.accountName,
      clientName:  account.clientName,
      userResponsible: account.userResponsible._id
    }
  }).then(
    res.status(200).send({ message: 'The Account was updated successfully', status: 'success' })
  )
};

exports.deleteAccount = async (req, res) => {
  await Account.deleteOne({ _id: req.params.id}).then(
    res.status(200).send({ message: 'The Account was deleted successfully', status: 'success' })
  )
};