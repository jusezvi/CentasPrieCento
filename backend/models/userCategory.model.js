const mongoose = require("mongoose");
const UserCategory = mongoose.model(
  "UserCategory",
  new mongoose.Schema({
    user: String,
    category: String,
    limit: Number,
  })
);
module.exports = UserCategory;