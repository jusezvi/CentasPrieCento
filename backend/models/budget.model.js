const mongoose = require("mongoose");
const Budget = mongoose.model(
  "Budget",
  new mongoose.Schema({
    sum: Number,
    name: String,
    category: String,
    type: String,
    date: Date,
    user: String,
  })
);
module.exports = Budget;