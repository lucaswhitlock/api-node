const Pai = require("./../model/pai-schema");
const Aluno = require("./../model/aluno-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const log4j = require("../etc/log4j-init");

log = log4j.getLogger();

exports.create = async (req, res) => {
  let hashdPwsd = bcrypt.hashSync(req.body.pswUsuario);
  try {
    if (!req.body.filhoPai) {
      res.status(403).send({
        message: 'Aluno não informado!'
      })
    }
    let filho = await Aluno.findById(req.body.filhoPai);
    if (!filho) {
      res.status(403).send({
        message: 'Aluno informado não encontrado na base de dados!'
      })
    } else if (filho.paiAluno.length >= 2) {
      res.status(403).send({
        message: 'Já existem dois responsáveis cadastrados para este aluno!'
      })
    }
    var pai = new Pai({
      nomeUsuario: req.body.nomeUsuario,
      cpfUsuario: req.body.cpfUsuario,
      pswUsuario: hashdPwsd,
      filhoPai: filho
    });
    let result = await pai.save(() => {
      filho.paiAluno.push(pai);
      filho.save()
    });
    res.status(200).send(pai);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.send(
      await Pai.find().populate({
        path: "filhoPai"
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
    res.send(await Pai.findById(req.params.paiId));
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
      await Pai.findByIdAndUpdate(req.params.paiId, req.body, {
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
    res.send(await Pai.findByIdAndRemove(req.params.paiId));
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  log.info('Requisição para Login recebida.');
  try {
    if (!req.body) {
      log.error('Requisição sem informação no corpo da mensagem.');
      res.status(500).send({
        message: 'Erro ao ler mensagem enviada!'
      });
    }
    let pai = await Pai.findOne({
      cpfUsuario: req.body.cpfUsuario
    });
    if (!pai) {
      log.error('Pai com CPF ' + req.body.cpfUsuario + ' não encontrado.');
      res.status(404).send({
        message: 'Usuario informado não cadastrado ou incorreto!'
      })
    } else if (!bcrypt.compareSync(req.body.pswUsuario, pai.pswUsuario)) {
      log.error('Senha informada pelo usuário é incorreta.');
      res.status(401).send({
        message: 'Senha incorreta!'
      })
    }
    let token = jwt.sign({
      id: pai._id,
      nomeUsuario: pai.nomeUsuario,
      cpfUsuario: pai.cpfUsuario
    }, process.env.SECRET, {
      expiresIn: 86400
    });
    log.info('Pai [' + pai.nomeUsuario + '] logado com sucesso!');
    res.status(200).send({
      nomeUsuario: pai.nomeUsuario,
      cpfUsuario: pai.cpfUsuario,
      token: token
    });
  } catch (error) {
    log.error('Erro ao realizar login do responsável!', error);
    res.status(500).send({
      message: error.message
    });
  }
};