const Monitor = require("./../model/monitor-schema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const log4j = require('../etc/log4j-init');

log = log4j.getLogger();

exports.create = async (req, res) => {
  let hashdPwsd = bcrypt.hashSync(req.body.pswUsuario);
  try {
    var monitor = new Monitor({
      nomeUsuario: req.body.nomeUsuario,
      cpfUsuario: req.body.cpfUsuario,
      pswUsuario: hashdPwsd
    });
    res.send(await monitor.save());
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.send(
      await Monitor.find().populate({
        path: "fosUsuario"
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findById = async (req, res) => {
  try {
    res.send(await Monitor.findById(req.params.monitorId));
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    res.send(
      await Monitor.findByIdAndUpdate(req.params.monitorId, req.body, {
        new: true
      })
    );
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    res.send(await Monitor.findByIdAndRemove(req.params.monitorId));
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  log.info('Requisição para Login recebida.')
  try {
    if (!req.body) {
      log.error('Requisição sem informação no corpo da mensagem.');
      res.status(500).send({
        message: 'Erro ao ler mensagem enviada!'
      });
    }
    let monitor = await Monitor.findOne({
      cpfUsuario: req.body.cpfUsuario
    });
    if (!monitor) {
      log.error('Monitor com CPF ' + req.body.cpfUsuario + ' não encontrado.');
      res.status(404).send({
        message: 'Usuario informado nao cadastrado ou incorreto!'
      })
    } else if (!bcrypt.compareSync(req.body.pswUsuario, monitor.pswUsuario)) {
      log.error('Senha informada pelo usuário é incorreta.');
      res.status(401).send({
        message: 'Senha incorreta!'
      })
    }
    let token = jwt.sign({
      id: monitor._id,
      nomeUsuario: monitor.nomeUsuario,
      cpfUsuario: monitor.cpfUsuario
    }, process.env.SECRET, {
      expiresIn: 86400
    });
    log.info('Monitor [' + monitor.nomeUsuario + '] logado com sucesso!');
    res.status(200).send({
      nomeUsuario: monitor.nomeUsuario,
      cpfUsuario: monitor.cpfUsuario,
      token: token
    })
  } catch (error) {
    log.error('Erro ao realizar login do monitor!', error);
    res.status(500).send({
      message: error.message
    });
  }
};
