const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");

router.get("/", auth, notificationController.listNotifications);
router.patch("/:id/read", auth, notificationController.markAsRead);
router.delete("/:id", auth, notificationController.deleteNotification);

module.exports = router;
