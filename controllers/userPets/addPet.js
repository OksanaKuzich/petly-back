const { UserPet } = require("../../models");
const { cloudinaryImgUpload } = require("../../helpers");

const addPet = async (req, res) => {
  let petAvatarURL = null;
  let petIdCloudAvatar = null;

  if (req.file) {
    const { avatarURL, idCloudAvatar } = await cloudinaryImgUpload(req);
    petAvatarURL = avatarURL;
    petIdCloudAvatar = idCloudAvatar;
  }

  const { _id: owner } = req.user;

  const { _id, name, birthday, breed, comments } = await UserPet.create({
    ...req.body,
    petsPhotoURL: petAvatarURL,
    owner,
    idCloudAvatar: petIdCloudAvatar,
  });

  res.status(201).json({
    newPet: {
      _id,
      name,
      birthday,
      breed,
      petsPhotoURL: petAvatarURL,
      comments,
      owner,
    },
  });
};

module.exports = addPet;
