const mongoose = require("mongoose");
const orderItemSchema = require("./OrderItem");

const orderSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // livreur est aussi un user
  elements: [orderItemSchema],
  prixTotal: { type: Number, required: true },
  statut: {
    type: String,
    enum: ["EnAttente", "Acceptée", "EnLivraison", "Livrée", "Annulée"],
    default: "EnAttente",
  },
  dateHeure: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
