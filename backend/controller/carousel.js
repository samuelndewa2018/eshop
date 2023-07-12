const express = require("express");
const Carousel = require("../model/carousel");
const router = express.Router();
const multer = require("multer");

router.get("/get-carousel", async (req, res) => {
  try {
    const carouselData = await Carousel.find();
    res.json(carouselData);
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage }).single("image");

router.post("/carousel", upload, (req, res) => {
  const { caption } = req.body;
  const image = req.file ? `${req.file.filename}` : "";

  const newCarouselItem = new Carousel({ caption, image });

  newCarouselItem
    .save()
    .then((savedCarouselItem) => {
      res.json(savedCarouselItem);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save the carousel" });
    });
});

router.delete("/carousel/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the carousel item by ID and remove it
    await Carousel.findByIdAndDelete(id);

    res.status(200).json({ message: "Carousel item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete carousel item" });
  }
});

module.exports = router;
