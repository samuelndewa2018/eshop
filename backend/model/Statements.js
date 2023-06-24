const mongoose = require("mongoose");

const statementsSchema = new mongoose.Schema({
  promotionName: {
    type: String,
    required: true,
    default: "Welcome to eShop",
  },
  typingName1: {
    type: String,
    required: true,
    default: "Welcome to eShop",
  },
  typingName2: {
    type: String,
    required: true,
    default: "Welcome to eShop",
  },
  typingName3: {
    type: String,
    required: true,
    default: "Welcome to eShop",
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
