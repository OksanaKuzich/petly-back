const express = require("express");
const router = express.Router();

const { friends: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getFriends));

module.exports = router;
