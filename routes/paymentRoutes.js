const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middlewares/authMiddleware");

router.post("/initiate", auth, paymentController.initiatePayment);
router.post("/confirm", auth, paymentController.confirmPayment);
router.get("/", auth, paymentController.getPayments);

module.exports = router;
