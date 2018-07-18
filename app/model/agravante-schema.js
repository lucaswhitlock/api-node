const mongoose = require("mongoose");

const agravanteSchema = new mongoose.Schema({
  codigoAgravante: {type: Number, required: true},
  descricaoAgravante: {type: String, required: true}
}, {
  collection: 'Agravantes',
  timestamps: true
});

module.exports = mongoose.model('Agravantes', agravanteSchema)