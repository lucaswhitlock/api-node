const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foSchema = new mongoose.Schema({
  aluno: [{ type: Schema.Types.ObjectId, required: true, ref: 'Alunos' }],
  monitor: [{ type: Schema.Types.ObjectId, required: true, ref: 'Monitores' }],
  descricao: { type: String, required: true },
  agravante: [{ type: Schema.Types.ObjectId, ref: 'Atenuantes' }],
  atenuante: [{ type: Schema.Types.ObjectId, ref: 'Agravantes' }],
  responsavel: [{ type: Schema.Types.ObjectId, ref: 'Pais' }]
}, {
  collection: 'FOs',
  timestamps: true
});

module.exports = mongoose.model('FOs', foSchema)