const mongoose = require("mongoose");

const atenuanteSchema = new mongoose.Schema({
  codigoAtenuante: {type: Number, required: true},
  descricaoAtenuante: {type: String, required: true}
}, {
  collection: 'Atenuantes',
  timestamps: true
});

module.exports = mongoose.model('Atenuantes', atenuanteSchema)