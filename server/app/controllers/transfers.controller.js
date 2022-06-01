const db = require("../models");
const Transfer = db.mongoose.model('Transfer', db.transfer.schema)

exports.getAllTransfers = async (req, res) => {
  const transfers = await Transfer.find().populate('account').populate('user')
  res.status(200).send(transfers)
};