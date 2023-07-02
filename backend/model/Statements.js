const mongoose = require("mongoose");

const statementsSchema = new mongoose.Schema({
  promotionName: {
    type: String,
    default: "Welcome to eShop",
  },
  typingName1: {
    type: String,
  },
  typingName2: {
    type: String,
  },
  typingName3: {
    type: String,
  },
  promotionImage: {
    type: String,
  },
  promotionDetails: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Statements", statementsSchema);
