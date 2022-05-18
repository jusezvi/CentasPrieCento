const mongoose = require("mongoose");
const Budget = mongoose.model(
  "Budget",
  new mongoose.Schema({
    sum: Number,
    name: String,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],
    type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Type"
        }
      ],
    date: Date,
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"   
        }
    ],
  })
);
module.exports = Budget;