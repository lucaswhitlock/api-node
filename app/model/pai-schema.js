const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema');
const Schema = mongoose.Schema;

const paiSchema = extendSchema(usuarioSchema,{
  pswUsuario: {type: String, required: true},
  filhoAluno: [{ type: Schema.Types.ObjectId, ref: 'Alunos' }]
}, {
  collection: 'Pais',
  timestamps: true
});

module.exports = mongoose.model('Pais', paiSchema)