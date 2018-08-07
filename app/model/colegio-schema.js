const mongoose = require("mongoose");

const colegioSchema = new mongoose.Schema({
  colegioUsuario: {type: String, required: true},
  colegioPassword: { type: String, required: true},
  colegioNome: { type: String, required: true },
  colegioComandante: { type: String, required: true},
  colegioRegiao: { type: String, required: true},
  colegioTelefone: { type: Number, required: true },
  colegioEmail: { type: String, required: true },
  colegioDados: {
    pais: [{ type: Schema.Types.ObjectId, ref: 'Pais' }],
    alunos: [{ type: Schema.Types.ObjectId, ref: 'Alunos' }],
    monitores: [{ type: Schema.Types.ObjectId, ref: 'Monitores' }],
    juizes: [{ type: Schema.Types.ObjectId, ref: 'Juizes' }],
    professores: [{ type: Schema.Types.ObjectId, ref: 'Professores' }]
  }
}, {
  collection: 'Colegios',
  timestamps: true
});

module.exports = mongoose.model('Colegios', colegioSchema);