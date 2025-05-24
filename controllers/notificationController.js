const Notification = require("../models/Notification");

// Lister les notifications d'un utilisateur (optionnel: filtrer par lues/non lues)
exports.listNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Marquer une notification comme lue
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { read: true },
      { new: true }
    );
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    res.json({ message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
