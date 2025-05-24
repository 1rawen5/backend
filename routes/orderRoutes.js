const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth");

router.post("/place", auth, orderController.placeOrder);
router.get("/:id", auth, orderController.getOrder);
router.get("/user/list", auth, orderController.listUserOrders);
router.delete("/cancel/:id", auth, orderController.cancelOrder);
router.put("/update-status/:id", auth, orderController.updateOrderStatus);

module.exports = router;
