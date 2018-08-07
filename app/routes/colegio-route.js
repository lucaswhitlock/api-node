module.exports = (api) => {

    const colegio = require('../controller/colegio-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/colegios/login', colegio.login)
    api.post('/colegios', seguranca.verify, colegio.create)
    api.get('/colegios', seguranca.verify, colegio.findAll)
    api.get('/colegios/:colegioId', seguranca.verify, colegio.findById)
    api.put('/colegios/:colegioId', seguranca.verify, colegio.update)
    api.delete('/colegios/:colegioId', seguranca.verify, colegio.delete)

}