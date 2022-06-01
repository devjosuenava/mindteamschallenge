const db = require("../models");
const User = db.mongoose.model('User', db.user.schema)
const Role = db.mongoose.model('Role', db.role.schema)
var bcrypt = require("bcryptjs")

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate('role')
  console.log(users)
  res.status(200).send(users)
};

exports.createUser = async (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.role) {
      Role.findOne(
        {
          name: req.body.role
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.role = role._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!", status: 'success' });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.role = role._id;
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!", status: 'success' });
        });
      });
    }
  });
};

exports.updateUser = async (req, res) => {
  const role = await Role.findOne({ name: req.body.role })
  await User.updateOne({_id: req.params.id }, {
    $set: {
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: role._id
    }
  })
  res.status(200).send({ message: 'The User was updated successfully', status: 'success' })    
};

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id}).then(
    res.status(200).send({ message: 'The User was deleted successfully', status: 'success' })
  )
};