const { Friend } = require("../../models");

const getFriends = async (req, res) => {
  const friends = await Friend.find({});

  res.status(200).json({
    friends,
  });
};

module.exports = getFriends;
