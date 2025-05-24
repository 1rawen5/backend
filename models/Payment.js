const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  methode: {
    type: String,
    enum: ["Espèces", "CarteBancaire", "PaiementMobile"],
    required: true,
  },
  statut: {
    type: String,
    enum: ["Payé", "Échoué", "EnAttente"],
    default: "EnAttente",
  },
  montant: { type: Number, required: true },
});

module.exports = mongoose.model("Payment", paymentSchema);
