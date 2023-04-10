const express = require("express");

const { users: userCtrl } = require("../../controllers");
const { userPets: petCtrl } = require("../../controllers");

const { validation, auth, isValidPetId, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { userPetSchema } = require("../../models");

const router = express.Router();

router.get("/", auth, ctrlWrapper(userCtrl.getUserData));

router.get("/current", auth, ctrlWrapper(userCtrl.getCurrentUser));

router.get("/pets", auth, ctrlWrapper(petCtrl.getUserPets));

router.post(
  "/pets",
  auth,
  upload.single("image"),
  validation(userPetSchema),
  ctrlWrapper(petCtrl.addPet)
);

router.delete(
  "/pets/:petId",
  auth,
  isValidPetId,
  ctrlWrapper(petCtrl.removePet)
);

module.exports = router;
