const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId, auth, upload } = require("../../middlewares");

const { joiNoticesSchema } = require("../../models/notice");

const { notices: ctrl } = require("../../controllers");

router.get("/category/:category", ctrlWrapper(ctrl.listNoticeCategory));
router.get("/title/:category/:title", ctrlWrapper(ctrl.listNoticeTitle));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getNoticeById));
router.get("/user/favorites", auth, ctrlWrapper(ctrl.listUserFavorite));
router.get("/user/favorites/title/:title", auth, ctrlWrapper(ctrl.searchFavoriteNoticeByTitle));
router.get("/", auth, ctrlWrapper(ctrl.listUserNotices));
router.get("/title/:title", auth, ctrlWrapper(ctrl.searchUserNoticeByTitle));

router.post(
  "/",
  auth,
  upload.single("image"),
  validation(joiNoticesSchema),
  ctrlWrapper(ctrl.addNotice)
);
router.post(
  "/favorites/:id",
  isValidId,
  auth,
  ctrlWrapper(ctrl.addNoticeFavorite)
);

router.delete(
  "/favorites/:id",
  isValidId,
  auth,
  ctrlWrapper(ctrl.delNoticeFavorite)
);
router.delete("/:id", isValidId, auth, ctrlWrapper(ctrl.delUserNotice));

module.exports = router;
