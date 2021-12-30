const { Schema, model } = require("mongoose");

const phonebookSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Phonebook = model("Phonebook", phonebookSchema);

module.exports = Phonebook;
