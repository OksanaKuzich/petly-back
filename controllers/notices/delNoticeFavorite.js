const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const delNoticeFavorite = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const { favorite } = await Notice.findOne({ _id: id });

  if (!favorite.includes(userId)) {
    throw HttpError(500, "Notice not in favorites");
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    { $pull: { favorite: userId } }
  );

  res.status(200).json({ message: "Deleted from favorites" });
};

module.exports = delNoticeFavorite;
