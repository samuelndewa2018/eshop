const mongoose = require("mongoose");

const typingNamesSchema = new mongoose.Schema({
  type: String,
  color: String,
  // Add more fields as per your requirements
});

const statementsSchema = new mongoose.Schema({
  promotionName: {
    type: String,
    required: true,
    default: "Welcome to eShop",
  },
  typingNames: [typingNamesSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Statements", statementsSchema);
