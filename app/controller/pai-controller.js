const isNull = require("util");
const Pai = require("./../model/pai-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  let hashdPwsd = bcrypt.hashSync(req.body.pswUsuario);
  try {
    var pai = new Pai({
      nomeUsuario: req.body.nomeUsuario,
      cpfUsuario: req.body.cpfUsuario,
      pswUsuario: hashdPwsd
    });
    res.send(await pai.save());
  } catch (error) {
    console.log(err);
    res.status(500).send({
      message: err.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.send(
      await Pai.find().populate({
        path: "filhoAluno"
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
  try {
    if (!req.body) {
      res.status(500).send({
        message: 'Erro ao ler mensagem enviada!'
      });
    }
    let pai = await Pai.findOne({
      cpfUsuario: req.body.cpfUsuario
    });
    if (!pai) {
      res.status(404).send({
        message: 'Usuario informado nao cadastrado ou incorreto!'
      })
    } else if (!bcrypt.compareSync(req.body.pswUsuario, pai.pswUsuario)) {
      res.status(401).send({
        message: 'Senha incorreta!'
      })
    }
    res.status(200).send(pai);
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao ler mensagem enviada!'
    });
  }
};