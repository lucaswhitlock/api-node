const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    refnotice: { type: String, required: true }
  },
  {
    collection: "projects",
    timestamps: true
  }
);

module.exports = mongoose.model("Projects", projectSchema);
