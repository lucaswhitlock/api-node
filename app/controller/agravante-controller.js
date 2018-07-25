const isNull = require("util");
const Agravante = require("./../model/agravante-schema");

exports.create = async (req, res) => {
    var agravante = new Agravante({
        codigoAgravante: req.body.codigoAgravante,
        descricaoAgravante: req.body.descricaoAgravante
    })

    try {
        res.send(await agravante.save())
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.findAll = async (req, res) => {
    try {
        res.send(await Agravante.find())
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.findById = async (req, res) => {
    try {
        res.send(await Agravante.findById(req.params.agravanteId))
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.update = async (req, res) => {
    try {
        res.send(await Agravante.findByIdAndUpdate(req.params.agravanteId, req.body, {
            new: true
        }))
    } catch (error) {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Não foi possível encontrar nenhum tipo de FO com o id: " + req.params.agravanteId
            });
        }
        return res.status(500).send({
            message: "Não foi possível deletar o tipo de FO com o id: " + req.params.agravanteId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        res.send(await Agravante.findByIdAndRemove(req.params.agravanteId))
    } catch (error) {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Não foi possível encontrar nenhum tipo de FO com o id: " + req.params.agravanteId
            });
        }
        return res.status(500).send({
            message: "Não foi possível deletar o tipo de FO com o id: " + req.params.agravanteId
        });
    }
};
