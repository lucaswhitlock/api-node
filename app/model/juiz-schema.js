const mongoose = require("mongoose");
const extendSchema = require('mongoose-extend-schema');
const usuarioSchema = require('./usuario-schema')

const juizSchema = extendSchema(usuarioSchema, {
  pswUsuario: {type: String, required: true}
}, {
  collection: 'Juizes',
  timestamps: true
});

module.exports = mongoose.model('Juizes', juizSchema)