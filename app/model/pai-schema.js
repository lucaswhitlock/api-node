const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema');
const Schema = mongoose.Schema;

const paiSchema = extendSchema(usuarioSchema,{
  pswUsuario: {type: String, required: true},
  telefonePai: { type: Number },
  emailPai: { type: String, required: true },
  filhoPai: [{ type: Schema.Types.ObjectId, required: true, ref: 'Alunos' }]
}, {
  collection: 'Pais',
  timestamps: true
});

module.exports = mongoose.model('Pais', paiSchema)