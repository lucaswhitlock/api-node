const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new mongoose.Schema({
  nomeUsuario: {type: String, required: true},
  cpfUsuario: {type: String, required: true, length: 11},
  pswUsuario: {type: String},
  fosUsuarios: [{ type: Schema.Types.ObjectId, ref: 'FOs' }]
}, {
  collection: 'Usuarios',
  timestamps: true
});

module.exports = usuarioSchema;