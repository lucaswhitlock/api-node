const isNull = require("util");
const Psico = require("./../model/psico-schema");

exports.create = async (req, res) => {
  var psico = new Psico({
    nomePsico: req.body.nomePsico,
    telefonePsico: req.body.telefonePsico,
    emailPsico: req.body.emailPsico
  })

  try {
    res.send(await psico.save())
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.findAll = async (req, res) => {
  try {
    res.send(await Psico.find())
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.findById = async (req, res) => {
  try {
    res.send(await Psico.findById(req.params.psicoId))
  } catch (error) {
    res.status(500).send(error.message)
  }
};

exports.update = async (req, res) => {
  try {
    res.send(await Psico.findByIdAndUpdate(req.params.psicoId, req.body, {
      new: true
    }))
  } catch (error) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any type with the id " + req.params.psicoId
      });
    }
    return res.status(500).send({
      message: "Could not delete type with id " + req.params.psicoId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    res.send(await Psico.findByIdAndRemove(req.params.psicoId))
  } catch (error) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any fo with the id " + req.params.psicoId
      });
    }
    return res.status(500).send({
      message: "Could not delete fo with id " + req.params.psicoId
    });
  }
};
