const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantite: { type: Number, required: true, default: 1 },
});

module.exports = orderItemSchema; // exporte comme sous-schema
