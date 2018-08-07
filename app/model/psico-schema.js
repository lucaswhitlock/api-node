const mongoose = require("mongoose");

const psicoSchema = new mongoose.Schema({
  nomePsico: {type: String, required: true},
  telefonePsico: {type: String, required: true},
  emailPsico: {type: String, required: true}
}, {
  collection: 'Psicologos',
  timestamps: true
});

module.exports = mongoose.model('Psicologos', psicoSchema)