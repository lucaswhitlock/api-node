const isNull = require("util");
const Monitor = require("./../model/monitor-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || 'cmcgmonitoria'

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
        path: "fosUsuarios"
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

exports.register = async (req, res) => {
  try {
    let monitor = await Monitor.findOne({ cpfUsuario: req.body.cpfUsuario })
    if (!bcrypt.compareSync(req.body.pswUsuario, monitor.pswUsuario)){
      res.status(401).send({ message: 'Acesso nao permitido! Senha incorreta.' })
    }
    let userToken = jwt.sign({ 
      id: monitor._id, 
      nomeUsuario: monitor.nomeUsuario,
      cpfUsuario: monitor.cpfUsuario
    }, SECRET, {
      expiresIn: 86400
    });
    res.status(200).send({ token: userToken })
  } catch (error) {
    res.status(500).send({ message: 'Erro ao autenticar usuario' });
  }
};

exports.autenticate = async (req, res) => {
  try {
    var headerToken = req.headers['x-user-token'];
    if (!headerToken) {
      res.status(401).send('Token invalido!')
    }
    jwt.verify(headerToken, SECRET, function (error, decrypt) {
      if (error) {
        res.status(500).send({
          auth: false,
          message: 'Falha ao autenticar usuario!'
        })
      }
      res.status(200).send(decrypt);
    })
  } catch (error) {
    res.status(500).send({
      auth: false,
      message: 'Falha ao autenticar usuario!'
    })
  }
};