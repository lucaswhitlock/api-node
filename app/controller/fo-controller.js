const isNull = require("util");
const FO = require("./../model/fo-schema");
const Monitor = require("./../model/monitor-schema")

exports.create = async (req, res) => {
  var fo = new FO({
    aluno: req.body.aluno,
    monitor: req.body.monitor,
    descricao: req.body.descricao,
  });

  try {
    let result = await fo.save(function (err) {
      if (err) {
        res.status(500).send(err.message)
      }
      Monitor.findById(req.body.monitor, function (err, monitor) {
        if (err) console.log(err);
        monitor.foMonitor.push(fo);
        monitor.save(function (err, monitorAtualizado) {
          if (err) return handleError(err);
          res.send(fo);
        });
      });
    })
  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
};

exports.findAll = async (req, res) => {
  try {
    res.json(await FO.find().populate('aluno').populate({
      path: 'monitor',
      select: 'nomeMonitor nrMonitor'
    }));
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error while trying to retrieve fos!"
      });
  }
};

exports.findById = async (req, res) => {
  try {
    const result = await FO.findById(req.params.foId);
    if (result.isNull) {
      res.status(404).send({
        message: "Couldn't find any fo with the id:" + req.params.foId
      });
    }
    res.send(result);
  } catch (err) {
    if (err.kind === "ObjectId" || err.kind === undefined) {
      return res.status(404).send({
        message: "Couldn't find any fo with the id:" + req.params.foId
      });
    }
    return res.status(500).send({
      message: "Database error, please contact your support for more information!"
    });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await FO.findByIdAndUpdate(
      req.params.foId,
      req.body, {
        new: true
      }
    );
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any fo with the id " + req.params.foId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any fo with the id " + req.params.foId
      });
    }
    return res.status(500).send({
      message: "Could not delete fo with id " + req.params.foId
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await FO.findByIdAndRemove(req.params.foId);
    if (result.isNull) {
      res.status(404).send({
        error: "Could not find any fo with the id " + req.params.foId
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Could not find any fo with the id " + req.params.foId
      });
    }
    return res.status(500).send({
      message: "Could not delete fo with id " + req.params.foId
    });
  }
};