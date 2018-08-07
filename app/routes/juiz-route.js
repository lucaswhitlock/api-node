module.exports = (api) => {

    const juiz = require('../controller/juiz-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/juizes/login', juiz.login)
    api.post('/juizes', juiz.create)
    api.get('/juizes', seguranca.verify, juiz.findAll)
    api.get('/juizes/:juizId', seguranca.verify, juiz.findById)
    api.put('/juizes/:juizId', seguranca.verify, juiz.update)
    api.delete('/juizes/:juizId', seguranca.verify, juiz.delete)

}