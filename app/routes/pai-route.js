module.exports = (api) => {

    const pai = require('../controller/pai-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/pais/login', pai.login)
    api.post('/pais', pai.create)
    api.get('/pais', seguranca.verify, pai.findAll)
    api.get('/pais/:paiId', seguranca.verify, pai.findById)
    api.put('/pais/:paiId', seguranca.verify, pai.update)
    api.delete('/pais/:paiId', seguranca.verify, pai.delete)

}
