const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const delUserNotice = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const delNotice = await Notice.findOne({ _id: id });

  if (!delNotice) {
    throw HttpError(404, "Notice not found");
  }

  await Notice.findOneAndRemove({ _id: id, owner: userId });

  res.status(200).json({ message: "Notice deleted" });
};

module.exports = delUserNotice;
