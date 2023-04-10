const { HttpError } = require("../../helpers");
const { UserPet } = require("../../models");
const cloudinary = require("cloudinary").v2;

const removePet = async (req, res) => {
  const { _id: owner } = req.user;
  const { petId } = req.params;

  const pet = await UserPet.findOne({ _id: petId });
  if (pet.idCloudAvatar) {
    await cloudinary.uploader.destroy(pet.idCloudAvatar, {
      folder: "images",
    });
  }

  const result = await UserPet.findOneAndRemove({ _id: petId, owner });

  if (!result) {
    throw HttpError(404, "No pets found to delete");
  }

  res.status(200).json({ message: "Pet deleted" });
};

module.exports = removePet;
