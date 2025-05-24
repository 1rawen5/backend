const Payment = require("../models/Payment");
const Order = require("../models/Order");

// Créer un paiement lié à une commande
exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, method, transactionId } = req.body;

    if (!orderId || !amount || !method) {
      return res
        .status(400)
        .json({ message: "orderId, amount and method are required" });
    }

    // Vérifier que la commande existe et appartient à l'utilisateur
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Créer le paiement
    const payment = new Payment({
      user: req.user.userId,
      order: orderId,
      amount,
      method,
      status: "pending",
      transactionId: transactionId || null,
    });

    await payment.save();

    res.status(201).json({ message: "Payment created", payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour le statut du paiement (admin ou webhook)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "completed", "failed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = status;
    await payment.save();

    res.json({ message: `Payment status updated to ${status}`, payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lister les paiements de l'utilisateur connecté
exports.listUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Détail d'un paiement par id (uniquement propriétaire ou admin)
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("order");
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // Si tu souhaites vérifier que seul le propriétaire ou admin accède ici, fais-le dans le middleware d'auth

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
