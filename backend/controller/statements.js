const express = require("express");
const Statements = require("../model/Statements");
const router = express.Router();

// Get all statements
router.get("/get-statements", async (req, res) => {
  try {
    const statements = await Statements.find();
    res.json(statements);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve statements." });
  }
});
// Create a new statements
router.post("/create-statements", async (req, res) => {
  try {
    const newStatement = new Statements(req.body);
    const savedStatement = await newStatement.save();
    res.status(201).json(savedStatement);
  } catch (error) {
    res.status(400).json({ error: "Failed to create statement." });
  }
});
router.post("/update-statements", async (req, res) => {
  try {
    const updatedStatement = await Statements.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStatement);
  } catch (error) {
    res.status(400).json({ error: "Failed to update statement." });
  }
});
router.post("/delete-statements", async (req, res) => {
  try {
    await Statements.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete statement." });
  }
});

module.exports = router;
