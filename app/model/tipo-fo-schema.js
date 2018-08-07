const mongoose = require("mongoose");

const tipoFOSchema = new mongoose.Schema({
  codigoTipoFO: {type: Number, required: true},
  descricaoTipoFO: {type: String, required: true}
}, {
  collection: 'TipoFOs',
  timestamps: true
});

module.exports = mongoose.model('TipoFOs', tipoFOSchema)