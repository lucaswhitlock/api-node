const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    info: { type: String, required: true },
    img: { type: String, required: true },
    reference: { type: String, required: true }
  },
  {
    collection: "posts",
    timestamps: true
  }
);

module.exports = mongoose.model("Posts", postSchema);
