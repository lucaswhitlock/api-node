const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StatusFO = require('../etc/FOStatusEnum')

const foSchema = new mongoose.Schema({
  aluno: [{ type: Schema.Types.ObjectId, required: true, ref: 'Alunos' }],
  monitor: [{ type: Schema.Types.ObjectId, required: true, ref: 'Monitores' }],
  agravante: [{ type: Schema.Types.ObjectId, ref: 'Atenuantes' }],
  atenuante: [{ type: Schema.Types.ObjectId, ref: 'Agravantes' }],
  responsavel: [{ type: Schema.Types.ObjectId, required: true, ref: 'Pais' }],
  descricao: { type: String, required: true },
  status: { type: StatusFO, required: true }
}, {
  collection: 'FOs',
  timestamps: true
});

module.exports = mongoose.model('FOs', foSchema)