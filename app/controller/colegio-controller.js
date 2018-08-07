const Colegio = require("../model/colegio-schema");
const Pai = require("../model/pai-schema");
const Aluno = require("../model/aluno-schema");
const Monitor = require("../model/monitor-schema");
const Juiz = require("../model/juiz-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = 'cmcgmonitoria';

exports.create = async (req, res) => {
  let hashedPassword = bcrypt.hashSync(colegioPassword);
  var colegio = new Colegio({
    colegioUsuario: req.body.colegioUsuario,
    colegioPassword: hashedPassword,
    colegioNome: req.body.colegioNome,
    colegioComandante: req.body.colegioComandante,
    colegioRegiao: req.body.colegioRegiao,
    colegioTelefone: req.body.colegioTelefone,
    colegioEmail: req.body.colegioEmail
  });
  try {
    res.status(200).send(
      await colegio.save()
    );
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao inserir colégio! Favor entrar em contato com a administração.'
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    res.status(200).send(
      Colegio.find()
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
    res.send(await Colegio.findById(req.params.colegioId));
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
      await Colegio.findByIdAndUpdate(req.params.colegioId, req.body, {
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
    res.send(await Colegio.findByIdAndRemove(req.params.colegioId));
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
    let colegio = await Colegio.findOne({
      colegioUsuario: req.body.colegioUsuario
    });
    if (!colegio) {
      res.status(404).send({
        message: 'Usuario informado não cadastrado ou incorreto!'
      })
    } else if (!bcrypt.compareSync(req.body.colegioPassword, colegio.colegioPassword)) {
      res.status(401).send({
        message: 'Senha incorreta!'
      })
    }
    let token = jwt.sign({
      id: colegio._id,
      colegioUsuario: colegio.colegioUsuario,
      colegioPassword: colegio.colegioPassword
    }, SECRET, {
      expiresIn: 86400
    });
    res.status(200).send({
      user: {
        colegioUsuario: pai.colegioUsuario,
        token: token
      }
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.init = async (req, res) => {
  var pais = [];
  var alunos = [];
  var monitores = [];
  var juizes = [];
  try {
    pais.push(await Pai
      .find()
      .where('colegioUsuario')
      .equals(req.body._id)
    );
    alunos.push(await Aluno
      .find()
      .where('colegioUsuario')
      .equals(req.body._id)
    );
    monitores.push(await Monitor
      .find()
      .where('colegioUsuario')
      .equals(req.body._id)
    );
    juizes.push(await Juiz
      .find()
      .where('colegioUsuario')
      .equals(req.body._id)
    );
    var colegio = Colegio.findById(req.body._id, () => {
      colegio.colegioDados.pais.push(pais);
      colegio.colegioDados.alunos.push(alunos);
      colegio.colegioDados.monitores.push(monitores);
      colegio.colegioDados.juizes.push(juizes);
    });
    res.status(200).send(colegio);
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao inicializar colégio! Favor entrar em contato com a administração.'
    })
  }
}