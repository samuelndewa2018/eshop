const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter your Category's name!"],
  },

  image: {
    type: String,
  }, // Image URL
});

module.exports = mongoose.model("Category", categorySchema);
