const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.category = require('./category.model');
db.type = require("./type.model");
db.budget = require("./budget.model");
db.userCategory = require('./userCategory.model')
db.ROLES = ["user", "admin"];
module.exports = db;
