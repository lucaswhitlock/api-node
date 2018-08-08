const Professor = require("./../model/professor-schema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const log4j = require('../etc/log4j-init');
const SECRET_MONITORIA = 'cmcgmonitoria';

log = log4j.getLogger();

exports.create = async (req, res) => {
  let hashdPwsd = bcrypt.hashSync(req.body.pswUsuario);
  try {
    var professor = new Professor({
      nomeUsuario: req.body.nomeUsuario,
      cpfUsuario: req.body.cpfUsuario,
      pswUsuario: hashdPwsd
    });
    res.send(await professor.save());
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
      await Professor.find().populate({
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
    res.send(await Professor.findById(req.params.professorId));
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
      await Professor.findByIdAndUpdate(req.params.professorId, req.body, {
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
    res.send(await Professor.findByIdAndRemove(req.params.professorId));
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
    let professor = await Professor.findOne({
      cpfUsuario: req.body.cpfUsuario
    });
    if (!professor) {
      log.error('Professor com CPF ' + req.body.cpfUsuario + ' não encontrado.');
      res.status(404).send({
        message: 'Usuario informado nao cadastrado ou incorreto!'
      })
    } else if (!bcrypt.compareSync(req.body.pswUsuario, professor.pswUsuario)) {
      log.error('Senha informada pelo usuário é incorreta.');
      res.status(401).send({
        message: 'Senha incorreta!'
      })
    }
    let token = jwt.sign({
      id: professor._id,
      nomeUsuario: professor.nomeUsuario,
      cpfUsuario: professor.cpfUsuario
    }, SECRET_MONITORIA, {
      expiresIn: 86400
    });
    log.info('Professor [' + professor.nomeUsuario + '] logado com sucesso!');
    res.status(200).send({
      nomeUsuario: professor.nomeUsuario,
      cpfUsuario: professor.cpfUsuario,
      token: token
    })
  } catch (error) {
    log.error('Erro ao realizar login do professor!', error);
    res.status(500).send({
      message: error.message
    });
  }
};
