const mongoose = require("mongoose");
const Joi = require("joi");

const noticeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "in-good-hands"],
    },
    title: {
      type: String,
      minlength: 2,
      maxlength: 48,
    },
    name: {
      type: String,
    },
    birthday: {
      type: String,
      default: null,
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 24,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    location: {
      type: String,
      required: [true, "City/region is required"],
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
    },
    price: {
      type: Number,
    },
    avatarURL: {
      type: String,
    },
    price: {
      type: Number,
    },
    favorite: [],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const joiNoticesSchema = Joi.object({
  category: Joi.string().required(),
  title: Joi.string()
    .regex(/^[A-Za-z\s]+$/)
    .trim()
    .min(2)
    .max(48)
    .required()
    .messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.pattern.base": "Title must contain only letters",
      "string.min": "Title must be at least {#limit} characters long",
      "string.max": "Title must be not exceed {#limit} characters",
      "any.required": "Title is a required field",
    }),
  name: Joi.string()
    .regex(/^[A-Za-z\s]+$/)
    .trim()
    .min(2)
    .max(16)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.pattern.base": "Name must contain only letters",
      "string.min": "Name must be at least {#limit} characters long",
      "string.max": "Name must be not exceed {#limit} characters",
      "any.required": "Name is a required field",
    }),
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
    })
    .required(),
  breed: Joi.string()
    .regex(/^[A-Za-z\s]+$/)
    .trim()
    .min(2)
    .max(24)
    .required()
    .messages({
      "string.base": "Breed must be a string",
      "string.empty": "Breed cannot be empty",
      "string.pattern.base": "Breed must contain only letters",
      "string.min": "Breed must be at least {#limit} characters long",
      "string.max": "Breed must be not exceed {#limit} characters",
      "any.required": "Breed is a required field",
    }),
  sex: Joi.string().required(),
  location: Joi.string()
    .regex(/^[A-Za-z\s]+,\s[A-Za-z\s]+$/)
    .required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.string()
    .regex(/^(?!0\d)\d+(?:\.\d{1,2})?$/)
    .messages({
      "string.base": "Price must be a string",
      "string.empty": "Price cannot be empty",
      "string.pattern.base":
        "Price must be a number that does not start with 0",
      "any.required": "Price is a required field",
    }),
  avatarURL: Joi.string(),
});

const Notice = mongoose.model("notice", noticeSchema);

module.exports = {
  Notice,
  joiNoticesSchema,
};
