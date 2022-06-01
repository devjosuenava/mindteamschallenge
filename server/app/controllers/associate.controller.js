const db = require("../models");
const User = db.mongoose.model('User', db.user.schema)
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

exports.getAllAssociates = async (req, res) => {
  const associates = await Associate.find()
  associates.then(res.status(200).send(associates))
};

exports.getAvailableUsers = async (req, res) => {
  const usersAvailable = await User.aggregate([
    {
      $lookup: {
        from: 'associates',
        localField: '_id',
        foreignField: 'user',
        as: 'join'
      }
    },
    {
      $match: {
        "join": {
          $size: 0
        }
      }
    },
    {
      $project: {
        join: 0
      }
    }
  ])
  res.status(200).send(usersAvailable)
};

exports.getAccountAssociates = async (req, res) => {
  const accountAssociates = await Associate.find({ account: req.body.id }).populate('user')
  res.status(200).send(accountAssociates)
};

exports.createAssociate = (req, res) => {
  const associate = new Associate({
    user: req.body.user,
    account: req.body.account,
    responsible: req.body.responsible
  });
  associate.save((err, associate) => {    
    if (err) {
      res.status(500).send({ message: err, status: 'error' });
      return;
    }  
    createTransfer({
      account: associate.account._id,
      user: associate.user._id,
      type: 'ASSIGNMENT'
    })    
    res.send({ message: "The Account Associate was registered successfully!", status: 'success' });
  });
};

exports.deleteAssociate = async (req, res) => {  
  const existingAssociate = await Associate.findOne({_id: req.params.id})
  createTransfer({
    account: existingAssociate.account,
    user: existingAssociate.user,
    type: 'UNASSIGNMENT'
  })
  await Associate.deleteOne({_id: req.params.id})
  res.status(200).send({ message: 'The Account Associate was deleted successfully', status: 'success' })
};