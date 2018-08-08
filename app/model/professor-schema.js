const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema');

const professorSchema = extendSchema(usuarioSchema, {
  pswUsuario: { type: String, required: true }
}, {
  collection: 'Professores',
  timestamps: true
});

module.exports = mongoose.model('Professores', professorSchema)