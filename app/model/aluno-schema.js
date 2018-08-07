const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema');
const Schema = mongoose.Schema;

const alunoSchema = extendSchema(usuarioSchema,{
  nrAluno: {type: Number, required: true},
  salaAluno: {type: String, required: true},
  paiAluno: [{ type: Schema.Types.ObjectId, ref: 'Pais' }]
}, {
  collection: 'Alunos',
  timestamps: true
});

module.exports = mongoose.model('Alunos', alunoSchema)