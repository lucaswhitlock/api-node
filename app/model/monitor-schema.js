const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema')

const monitorSchema = extendSchema(usuarioSchema, {
  pswUsuario: {type: String, required: true}
}, {
  collection: 'Monitores',
  timestamps: true
});

module.exports = mongoose.model('Monitores', monitorSchema)