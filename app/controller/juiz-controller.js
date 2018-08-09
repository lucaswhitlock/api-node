const Juiz = require("./../model/juiz-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    let hashdPwsd = bcrypt.hashSync(req.body.pswUsuario);
    try {
        var juiz = new Juiz({
            nomeUsuario: req.body.nomeUsuario,
            cpfUsuario: req.body.cpfUsuario,
            pswUsuario: hashdPwsd
        });
        res.send(await juiz.save());
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
            await Juiz.find().populate({
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
        res.send(await Juiz.findById(req.params.juizId));
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
            await Juiz.findByIdAndUpdate(req.params.juizId, req.body, {
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
        res.send(await Juiz.findByIdAndRemove(req.params.juizId));
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
        let juiz = await Juiz.findOne({
            cpfUsuario: req.body.cpfUsuario
        });
        if (!juiz) {
            res.status(404).send({
                message: 'Usuario informado nao cadastrado ou incorreto!'
            })
        } else if (!bcrypt.compareSync(req.body.pswUsuario, juiz.pswUsuario)) {
            res.status(401).send({
                message: 'Senha incorreta!'
            })
        }
        let token = jwt.sign({
            id: juiz._id,
            nomeUsuario: juiz.nomeUsuario,
            cpfUsuario: juiz.cpfUsuario
        }, process.env.SECRET, {
            expiresIn: 86400
        });
        res.status(200).send({
            user: {
                nomeUsuario: juiz.nomeUsuario,
                cpfUsuario: juiz.cpfUsuario,
                token: token
            }
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};