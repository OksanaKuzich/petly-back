const { UserPet } = require("../../models");

const getUserPets = async (req, res) => {
  const { _id: owner } = req.user;
  const userPets = await UserPet.find({ owner });

  res.json({
    userPets,
  });
};

module.exports = getUserPets;
