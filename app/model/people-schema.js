const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  photo: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  office: { type: Number, min: 8, required: true },
  lab: { type: Number, min: 8, required: true },
  email: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contacts', contactSchema)