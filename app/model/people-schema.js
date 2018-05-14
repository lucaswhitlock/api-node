const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  office: { type: Number, min: 10, required: true },
  lab: { type: Number, min: 10, required: true },
  email: { type: String, required: true }
}, {
  collection: 'peoples',
  timestamps: true
});

module.exports = mongoose.model('People', peopleSchema)