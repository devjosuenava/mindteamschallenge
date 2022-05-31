const db = require("../models");
const User = db.mongoose.model('User', db.user.schema)
const Account = db.mongoose.model('Account', db.account.schema)
const Associate = db.mongoose.model('Associate', db.associate.schema)

exports.getAllAssociates = async (req, res) => {
  const associates = await Associate.find()
  associates.then(res.status(200).send(associates))
};

exports.getAvailableAssociates = async (req, res) => {
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
    account: req.body.clientName,
    responsible: req.body.responsible
  });
  associate.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err, status: 'error' });
      return;
    }
    res.send({ message: "The Associate was registered successfully!", status: 'success' });
  });
};

// exports.updateAssociate= async (req, res) => {
//   await Associate.updateOne({_id: req.params.id }, {
//     $set: {
//       accountName: req.body.accountName,
//       clientName: req.body.clientName
//     }
//   })
//   res.status(200).send({ message: 'The Account was updated successfully', status: 'success' })
// };

// exports.deleteAccount = async (req, res) => {
//   await Account.deleteOne({ _id: req.params.id}).then(
//     res.status(200).send({ message: 'The Account was deleted successfully', status: 'success' })
//   )
// };