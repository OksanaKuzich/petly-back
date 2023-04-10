const { Schema, model } = require("mongoose");
const Joi = require("joi");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      required: [true, "Birthday is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    petsPhotoURL: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      required: [true, "Image is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const UserPet = model("pet", petSchema);

const userPetSchema = Joi.object({
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
    .max(16)
    .required()
    .messages({
      "string.base": "Breed must be a string",
      "string.empty": "Breed cannot be empty",
      "string.pattern.base": "Breed must contain only letters",
      "string.min": "Breed must be at least {#limit} characters long",
      "string.max": "Breed must be not exceed {#limit} characters",
      "any.required": "Breed is a required field",
    }),
  comments: Joi.string().trim(true).min(8).max(120).required(),
});

module.exports = { UserPet, userPetSchema };
