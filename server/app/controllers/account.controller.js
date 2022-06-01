const { transfer } = require("../models");
const db = require("../models");
const Account = db.mongoose.model('Account', db.account.schema)
const Associate = db.mongoose.model('Associate', db.associate.schema)
const Transfer = db.mongoose.model('Transfer', db.transfer.schema)

const createTransfer = (transferData) => {
  const transfer = new Transfer({
    account: transferData.account,
    user: transferData.user,
    type: transferData.type,
    date: new Date().toISOString()
  })
  transfer.save()
}


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
    associate.save((err, associate) => {
      createTransfer({
        account: associate.account._id,
        user: associate.user._id,
        type: 'ASSIGNMENT'
      })    
    })    
  })
  res.send({ message: "The Account was registered successfully!", status: 'success' })
};

exports.updateAccount= async (req, res) => {
  let account = await Account.findOne({ _id: req.params.id })
  if (account.accountName !==req.body.accountName) account.accountName = req.body.accountName
  if (account.clientName !== req.body.clientName) account.clientName = req.body.clientName
  if (account.toObject().hasOwnProperty('userResponsible')) {
    if(account.userResponsible._id !== req.body.userResponsible._id){      
      const existingAssociate = await Associate.findOne({account: account._id})
      createTransfer({
        account: existingAssociate.account._id,
        user: existingAssociate.user._id,
        type: 'UNASSIGNMENT'
      })
      await Associate.deleteOne({account: account._id})
      account.userResponsible = req.body.userResponsible
      const associate = new Associate({
        user: account.userResponsible,
        account: account._id,
        responsible: true
      })
      associate.save((err, associate) => {
        createTransfer({
          account: associate.account._id,
          user: associate.user._id,
          type: 'ASSIGNMENT'
        })    
      })
    }
  } else {
    account.userResponsible = req.body.userResponsible
    const associate = new Associate({
      user: account.userResponsible,
      account: account._id,
      responsible: true
    });
    associate.save((err, associate) => {
      createTransfer({
        account: associate.account._id,
        user: associate.user._id,
        type: 'ASSIGNMENT'
      })    
    })
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