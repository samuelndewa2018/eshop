const express = require("express");
const router = express.Router();
const { token, stkPush } = require("../controller/mpesa");

router.post("/stk", token, stkPush);

module.exports = router;
