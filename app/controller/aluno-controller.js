const isNull = require("util");
const Aluno = require("./../model/aluno-schema");

exports.create = async (req, res) => {
  try {
    var aluno = new Aluno({
      nomeUsuario: req.body.nomeUsuario,
      cpfUsuario: req.body.cpfUsuario,
      nrAluno: req.body.nrAluno,
      salaAluno: req.body.salaAluno
    });
    let result = await aluno.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    let result = await Aluno.find({});
    res.send(result);
  } catch (err) {
    res.send({
      message: err.message
    });
  }
};

exports.findById = async (req, res) => {
  try {
    let result = await Aluno.findById(req.params.alunoId);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    let result = await Aluno.findByIdAndUpdate(req.params.alunoId, req.body, {
      new: true
    });
    if (result.isNull) {
      res.status(404).send({
        error: "Nenhum aluno encontrado com o id: " + req.params.alunoId
      });
    }
    res.send(result);
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Nenhum aluno encontrado com o id: " + req.params.alunoId
      });
    }
    return res.status(500).send({
      message: "Nenhum aluno encontrado com o id: " + req.params.alunoId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let result = await Aluno.findByIdAndRemove(req.params.alunoId);
    if (result.isNull) {
      res.status(404).send({
        error: "Nenhum aluno encontrado com o id: " + req.params.alunoId
      });
    }
    res.send({
      message: "Aluno com o id " + req.params.alunoId + " deletado com sucesso!"
    });
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Nenhum aluno encontrado com o id: " + req.params.alunoId
      });
    }
    return res.status(500).send({
      message: "Nenhum aluno encontrado com o id: " + req.params.alunoId
    });
  }
};
