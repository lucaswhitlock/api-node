const FO = require("./../model/fo-schema");
const Monitor = require("./../model/monitor-schema");
const Pai = require("./../model/pai-schema");

exports.create = async (req, res) => {

  let paiFO = await Pai.findOne({ filhoPai: req.body.aluno });
  let monitorFO = await Monitor.findById(req.body.monitor);

  let foAgravantes = req.body.foAgravantes != null ? req.body.foAgravantes : null;
  let foAtenuantes = req.body.foAtenuantes != null ? req.body.foAtenuantes : null;

  var fo = new FO({
    foAluno: req.body.aluno,
    foMonitor: req.body.monitor,
    foResponsavel: paiFO,
    foDescricao: req.body.descricao,
    foAgravantes: foAgravantes,
    foAtenuantes: foAtenuantes
  });

  try {
    let result = await fo.save( () => {
      monitorFO.fosUsuario.push(fo);
      monitorFO.save();
      paiFO.fosUsuario.push(fo);
      paiFO.save();
    });
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
};

exports.findAll = async (req, res) => {
  try {
    res.json(await FO.find().populate({
      path: 'foAluno',
      select: 'nomeUsuario nrAluno salaAluno'
    }).populate({
      path: 'foMonitor',
      select: 'nomeUsuario cpfUsuario'
    }).populate({
      path: 'foResponsavel',
      select: 'nomeUsuario cpfUsuario'
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
    const result = await FO.findById(req.params.foId).populate({
      path: 'foAluno',
      select: 'nomeUsuario nrAluno salaAluno'
    }).populate({
      path: 'foMonitor',
      select: 'nomeUsuario cpfUsuario'
    }).populate({
      path: 'foResponsavel',
      select: 'nomeUsuario cpfUsuario'
    });
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