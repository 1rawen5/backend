module.exports.onlyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports.onlyDelivery = (req, res, next) => {
  if (req.user.role !== "livreur") {
    return res.status(403).json({ message: "Only delivery allowed" });
  }
  next();
};
