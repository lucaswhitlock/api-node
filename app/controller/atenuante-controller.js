const isNull = require("util");
const Atenuante = require("./../model/atenuante-schema");

exports.create = async (req, res) => {
  var atenuante = new Atenuante({
    codigoAtenuante: req.body.codigoAtenuante,
    descricaoAtenuante: req.body.descricaoAtenuante
  });

  try {
    res.send(await atenuante.save());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    res.send(await Atenuante.find());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.findById = async (req, res) => {
  try {
    res.send(await Atenuante.findById(req.params.atenuanteId));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    res.send(
      await Atenuante.findByIdAndUpdate(req.params.atenuanteId, req.body, {
        new: true
      })
    );
  } catch (error) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any type with the id " + req.params.atenuanteId
      });
    }
    return res.status(500).send({
      message: "Could not delete type with id " + req.params.atenuanteId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    res.send(await Atenuante.findByIdAndRemove(req.params.atenuanteId));
  } catch (error) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any fo with the id " + req.params.atenuanteId
      });
    }
    return res.status(500).send({
      message: "Could not delete fo with id " + req.params.atenuanteId
    });
  }
};
