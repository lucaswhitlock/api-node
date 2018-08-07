module.exports = (api) => {

    const agravante = require('../controller/agravante-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/agravantes', seguranca.verify, agravante.create)
    api.get('/agravantes', seguranca.verify, agravante.findAll)
    api.get('/agravantes/:agravanteId', seguranca.verify, agravante.findById)
    api.put('/agravantes/:agravanteId', seguranca.verify, agravante.update)
    api.delete('/agravantes/:agravanteId', seguranca.verify, agravante.delete)

}