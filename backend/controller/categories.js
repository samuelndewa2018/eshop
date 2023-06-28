const express = require("express");
const multer = require("multer");
const Category = require("../model/categories");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage }).single("image");

router.post("/create-category", upload, (req, res) => {
  const { name } = req.body;
  const image = req.file ? `${req.file.filename}` : "";

  const category = new Category({ name, image });

  category
    .save()
    .then((savedCategory) => {
      res.json(savedCategory);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save the category" });
    });
});

router.get("/categories", (req, res) => {
  Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch categories" });
    });
});

router.put("/categories/:id", upload, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  Category.findByIdAndUpdate(id, { name, image }, { new: true })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update the category" });
    });
});

router.delete("/categories-del/:id", (req, res) => {
  const { id } = req.params;

  Category.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Category deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete the category" });
    });
});

module.exports = router;
