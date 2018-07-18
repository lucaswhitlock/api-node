const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema');

const alunoSchema = extendSchema(usuarioSchema,{
  nrAluno: {type: Number, required: true},
  salaAluno: {type: String, required: true}
}, {
  collection: 'Alunos',
  timestamps: true
});

module.exports = mongoose.model('Alunos', alunoSchema)