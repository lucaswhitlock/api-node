const isNull = require("util");
const TipoFO = require("./../model/tipo-fo-schema");

exports.create = async (req, res) => {
    var tipoFO = new TipoFO({
        codigoTipoFO: req.body.codigoTipoFO,
        descricaoTipoFO: req.body.descricaoTipoFO
    })

    try {
        res.send(await tipoFO.save())
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.findAll = async (req, res) => {
    try {
        res.send(await TipoFO.find())
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.findById = async (req, res) => {
    try {
        res.send(await TipoFO.findById(req.params.tipofoId))
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.update = async (req, res) => {
    try {
        res.send(await TipoFO.findByIdAndUpdate(req.params.tipofoId, req.body, {
            new: true
        }))
    } catch (error) {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Could not find any type with the id " + req.params.tipofoId
            });
        }
        return res.status(500).send({
            message: "Could not delete type with id " + req.params.tipofoId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        res.send(await TipoFO.findByIdAndRemove(req.params.tipofoId))
    } catch (error) {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Could not find any fo with the id " + req.params.tipofoId
            });
        }
        return res.status(500).send({
            message: "Could not delete fo with id " + req.params.tipofoId
        });
    }
};