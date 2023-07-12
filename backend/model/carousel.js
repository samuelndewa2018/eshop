const { Schema } = require("mongoose");
const mongoose = require("mongoose");

// Define the Carousel schema
const CarouselSchema = new Schema({
  image: String,
  caption: String,
});

module.exports = mongoose.model("Carousel", CarouselSchema);
