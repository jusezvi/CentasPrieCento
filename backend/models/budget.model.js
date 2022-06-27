const mongoose = require("mongoose");
const Budget = mongoose.model(
  "Budget",
  new mongoose.Schema({
    pavadinimas: String,
    kodas: Number,
    adresas: String,
    type: String,
    date: Date,
    user: String,
    test: Number,
  })
);
module.exports = Budget;