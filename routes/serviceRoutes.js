const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middlewares/authMiddleware");

router.get("/check", serviceController.checkServiceHours);
router.put("/hours", auth, serviceController.updateServiceHours); // admin uniquement

module.exports = router;
