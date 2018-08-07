module.exports = (api) => {

    const atenuante = require('../controller/atenuante-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/atenuantes', seguranca.verify, atenuante.create)
    api.get('/atenuantes', seguranca.verify, atenuante.findAll)
    api.get('/atenuantes/:atenuanteId', seguranca.verify, atenuante.findById)
    api.put('/atenuantes/:atenuanteId', seguranca.verify, atenuante.update)
    api.delete('/atenuantes/:atenuanteId', seguranca.verify, atenuante.delete)

}