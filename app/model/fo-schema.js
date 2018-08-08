const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StatusFO = require('../etc/status-fo-enum')

const foSchema = new mongoose.Schema({
  foAluno: [{ type: Schema.Types.ObjectId, required: true, ref: 'Alunos' }],
  foMonitor: [{ type: Schema.Types.ObjectId, required: true, ref: 'Monitores' }],
  foAgravantes: [{ type: Schema.Types.ObjectId, ref: 'Atenuantes' }],
  foAtenuantes: [{ type: Schema.Types.ObjectId, ref: 'Agravantes' }],
  foResponsavel: [{ type: Schema.Types.ObjectId, required: true, ref: 'Pais' }],
  foDescricao: { type: String, required: true },
  foJustificativa: { type: String },
  foStatus: { type: StatusFO, required: true, default: StatusFO.ABERTO }
}, {
  collection: 'FOs',
  timestamps: true
});

module.exports = mongoose.model('FOs', foSchema)