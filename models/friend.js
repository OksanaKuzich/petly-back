const { Schema, model } = require("mongoose");

const friendSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: String,
    addressUrl: String,
    avatarURL: String,
    address: String,
    workDays: [
      {
        isOpen: Boolean,
        from: String,
        to: String,
      },
    ],
    phone: String,
    email: String,
  },
  { versionKey: false, timestamps: true }
);

const Friend = model("friend", friendSchema);

module.exports = {
  Friend,
};
