const express = require("express");
const router = express.Router();
const { getOsInformation } = require("../controllers/osController");

// Une seule fonction handler ici
router.get('/getDataFromPC', getOsInformation);

module.exports = router;