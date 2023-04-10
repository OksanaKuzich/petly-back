const addNotice = require("./addNotice");
const listNoticeCategory = require("./listNoticesCategory");
const getNoticeById = require("./getNoticeById");
const addNoticeFavorite = require("./addNoticeFavorite");
const delNoticeFavorite = require("./delNoticeFavorite");
const listNoticeTitle = require("./listNoticeTitle");
const listUserFavorite = require("./listUserFavorite");
const listUserNotices = require("./listUserNotices");
const delUserNotice = require("./delUserNotice");
const searchFavoriteNoticeByTitle = require("./searchFavoriteNoticeByTitle");
const searchUserNoticeByTitle = require("./searchUserNoticeByTitle");

module.exports = {
  addNotice,
  listNoticeCategory,
  getNoticeById,
  addNoticeFavorite,
  delNoticeFavorite,
  listNoticeTitle,
  listUserFavorite,
  listUserNotices,
  delUserNotice,
  searchFavoriteNoticeByTitle,
  searchUserNoticeByTitle,
};
