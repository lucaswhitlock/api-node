var jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    let token = req.body.token || req.headers['x-user-token'];
    if (!token) {
        res.status(401).send({
            message: 'Falha ao consumir recurso! Requisição não autorizada.'
        })
    } else {
        jwt.verify(token, process.env.SECRET, function (err, usuario) {
            if (err) { res.status(500).send({ message: 'Falha ao autenticar usuário! Token inválido.' }) }
            req.user = usuario;
            next();
        })
    }
}