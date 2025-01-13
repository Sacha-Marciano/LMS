const express = require("express");

const {
  createOrder,
  capturePayment,
} = require("../../controllers/studentsControllers/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.post("/finalize", capturePayment);

module.exports = router;
