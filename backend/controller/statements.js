const express = require("express");
const Statements = require("../model/Statements");
const router = express.Router();

// Get all statements
router.get("/get-statements", async (req, res) => {
  try {
    const statements = await Statements.find();
    res.status(200).json({
      success: true,
      statements,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve statements." });
  }
});

// Replace the first statement
router.post("/create-statements", async (req, res) => {
  const replacementStatement = req.body;

  try {
    const replacedStatement = await Statements.findOneAndReplace(
      {},
      replacementStatement,
      { new: true }
    );

    if (replacedStatement) {
      res.json(replacedStatement);
    } else {
      res.status(404).json({ error: "No statement found." });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to replace statement." });
  }
});

module.exports = router;
