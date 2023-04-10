const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { id } = req.params;

  const notice = await Notice.findById(
    { _id: id },
    "-createdAt -updatedAt -idCloudAvatar"
  ).populate("owner", "email phone");

  if (!notice) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(notice);
};
module.exports = getNoticeById;
