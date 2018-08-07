module.exports = (api) => {

    const tipoFO = require('../controller/tipo-fo-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/tipofos', seguranca.verify, tipoFO.create)
    api.get('/tipofos', seguranca.verify, tipoFO.findAll)
    api.get('/tipofos/:tipofoId', seguranca.verify, tipoFO.findById)
    api.put('/tipofos/:tipofoId', seguranca.verify, tipoFO.update)
    api.delete('/tipofos/:tipofoId', seguranca.verify, tipoFO.delete)

}