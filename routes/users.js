// routes/users.js
const express = require("express");
const router = express.Router();

// GET /users
router.get("/", (req, res) => {
  res.json({ message: "Hello users" });
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  // Simulation de réponse
  res.json({ userId, name: "Nom Exemple" });
});

// POST /users
router.post("/", (req, res) => {
  const { name, email } = req.body;
  // En vrai, tu ferais un insert en base
  res.status(201).json({ message: "Utilisateur créé", data: { name, email } });
});

module.exports = router;
