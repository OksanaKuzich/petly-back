const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    location: {
      type: String,
      required: [true, "City/region is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    birthday: {
      type: String,
      default: "00.00.0000",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("update", handleMongooseError);

const joiRegisterSchema = Joi.object({
  email: Joi.string().min(7).max(63).email().required(),
  password: Joi.string().trim(true).min(7).max(32).pattern(/^\S*$/).required(),
  name: Joi.string().alphanum().required(),
  location: Joi.string()
    .regex(/^[A-Za-z\s]+,\s[A-Za-z\s]+$/)
    .required(),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+[380]{3}\d{7}/)
    .required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().min(7).max(63).email().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().min(7).max(63).email(),
  birthday: Joi.string()
  .regex(/^([0-2][1-9]|[1-3]0|31)\.(0[1-9]|1[0-2])\.\d{4}$/)
  .custom((value, helpers) => {
    const day = parseInt(value.slice(0, 2));
    const month = parseInt(value.slice(3, 5));
    const year = parseInt(value.slice(6));

    if (day > 31 || (month === 2 && day > 29)) {
      return helpers.error("any.invalid");
    }

    if (month === 4 || month === 6 || month === 9 || month === 11) {
      if (day > 30) {
        return helpers.error("any.invalid");
      }
    }

    if (year < 1000 || year > 9999 || year > new Date().getFullYear()) {
      return helpers.error("any.invalid");
    }

    return value;
  })
  .messages({
    "string.pattern.base":
      "Invalid date, date must be in the format dd.mm.yyyy",
    "any.invalid": "Invalid date",
  }),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+[380]{3}\d{7}/),
  location: Joi.string().regex(/[A-Z][a-z]*,\s[A-Z][a-z]*/),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  userUpdateSchema,
};
