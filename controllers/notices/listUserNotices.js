const { Notice } = require("../../models/notice");

const listUserNotices = async (req, res) => {
  const { _id: userId } = req.user;

  const { page, limit } = req.query;

  const skip = (page - 1) * limit;
  const notices = await Notice.find(
    { owner: userId },
    "-createdAt -updatedAt -idCloudAvatar",
    {
      skip,
      limit,
    }
  )
    .sort({ createdAt: -1 })
    .populate("owner", "email phone");

  const total = await Notice.find({ owner: userId }).count();
  res.status(200).json({ notices, page, per_page: limit, total });
};

module.exports = listUserNotices;
