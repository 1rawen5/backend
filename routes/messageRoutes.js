const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

// Toutes les routes messages nécessitent l'authentification
router.post("/", auth, messageController.sendMessage);
router.get("/", auth, messageController.listMessages);
router.get("/:id", auth, messageController.getMessage);
router.delete("/:id", auth, messageController.deleteMessage);

module.exports = router;
