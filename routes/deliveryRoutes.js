const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/authMiddleware");

// Livreur uniquement
router.get("/", auth, deliveryController.getAssignedOrders);
router.put("/:id/status", auth, deliveryController.updateDeliveryStatus);

module.exports = router;
