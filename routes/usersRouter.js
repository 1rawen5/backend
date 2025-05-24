const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const uploadFile = require("../middlewares/uploadfile");

/* GET tous les utilisateurs */
router.get("/getUser", userController.getUser);

/* POST ajouter un client */
router.post("/addClient", userController.addClient);

/* POST ajouter un admin */
router.post("/addAdmin", userController.addAdmin);

/* POST delete*/
router.delete("/deleteUserById/:id", userController.deleteUserById);

router.get("/getUserById/:id", userController.getUserById);

router.put("/updatePassword/:id", userController.updatePassword);

router.put("/updateUser/:id", userController.updateUser);

router.post(
  "/addUserWithImage",
  uploadFile.single("image_user"),
  userController.addUserWithImage
);

module.exports = router;
