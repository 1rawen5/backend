const Order = require("../models/Order"); // Mongoose Order model

// Helper to check if current time is between 22:00 and 06:00
function isWithinServiceHours() {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 22 || hours < 6;
}

module.exports = {
  async placeOrder(req, res) {
    try {
      if (!isWithinServiceHours()) {
        return res
          .status(403)
          .json({
            message: "Orders can only be placed between 10 PM and 6 AM",
          });
      }

      const { products, deliveryAddress, paymentMethod } = req.body;

      // Basic validation
      if (!products || products.length === 0) {
        return res
          .status(400)
          .json({ message: "Order must contain at least one product" });
      }

      const order = new Order({
        user: req.user.userId,
        products,
        deliveryAddress,
        paymentMethod,
        status: "Pending",
        createdAt: new Date(),
      });

      await order.save();

      res
        .status(201)
        .json({ message: "Order placed successfully", orderId: order._id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate("products")
        .populate("user", "name email");
      if (!order) return res.status(404).json({ message: "Order not found" });

      // Make sure only owner or admin/delivery person can access (add auth check middleware)

      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listUserOrders(req, res) {
    try {
      const orders = await Order.find({ user: req.user.userId }).sort({
        createdAt: -1,
      });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async cancelOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      if (order.user.toString() !== req.user.userId)
        return res.status(403).json({ message: "Unauthorized" });

      if (order.status !== "Pending") {
        return res
          .status(400)
          .json({ message: "Order cannot be canceled at this stage" });
      }

      order.status = "Canceled";
      await order.save();

      res.json({ message: "Order canceled successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      // This endpoint is mainly for delivery person or admin to update status

      const { status } = req.body;
      const validStatuses = [
        "Pending",
        "Accepted",
        "On the way",
        "Delivered",
        "Canceled",
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.status = status;
      await order.save();

      res.json({ message: `Order status updated to ${status}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
