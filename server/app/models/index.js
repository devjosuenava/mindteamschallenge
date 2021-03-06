const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.account = require("./account.model");
db.associate = require("./associate.model")
db.transfer = require("./transfer.model")
db.ROLES = ["user", "admin", "superadmin"];
module.exports = db;