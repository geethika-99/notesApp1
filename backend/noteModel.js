const mongoose = require("mongoose");

// Define the shape of a Note document in MongoDB
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
