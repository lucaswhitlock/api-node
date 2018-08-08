const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new mongoose.Schema({
  nomeUsuario: { type: String, required: true },
  cpfUsuario: { type: String, required: true, length: 11 },
  fosUsuario: [{ type: Schema.Types.ObjectId, ref: 'FOs' }],
  colegioUsuario: [{ type: Schema.Types.ObjectId, ref: 'Colegios' }]
}, {
  collection: 'Usuarios',
  timestamps: true
});

module.exports = usuarioSchema;