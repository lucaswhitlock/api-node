const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, min: 8, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true }
}, {
  collection: 'contacts',
  timestamps: true
});

module.exports = mongoose.model('Contacts', contactSchema)