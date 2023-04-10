const express = require("express");
const router = express.Router();

const { news: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.getNews));

module.exports = router;
