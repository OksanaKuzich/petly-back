const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { validation, auth, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const {
  joiRegisterSchema,
  joiLoginSchema,
  userUpdateSchema,
} = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.patch(
  "/changeData",
  auth,
  upload.single("image"),
  validation(userUpdateSchema),
  ctrlWrapper(ctrl.changeData)
);

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
