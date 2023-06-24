const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Statements = require("../model/Statements");

// create new order
router.post(
  "/create-statement",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const statements = await Statements.create({
        statements: "Welcome to eShop",
      });

      res.status(201).json({
        success: true,
        statements,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all satements
router.get(
  "/get-all-statements",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const statements = await Statements.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        statements,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
