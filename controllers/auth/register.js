const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { password, email, name, location, phone } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Provided email already exists");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    password: hashPassword,
    email,
    name,
    location,
    phone,
    avatarURL,
  });

  const { _id } = newUser;

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(_id, { token });

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      email,
      name,
      avatarURL,
    },
  });
};

module.exports = register;
