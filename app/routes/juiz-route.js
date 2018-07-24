module.exports = (api) => {

    const juiz = require('../controller/juiz-controller')

    api.post('/juizes', juiz.create)
    api.post('/juizes/login', juiz.login)
    api.get('/juizes', juiz.findAll)
    api.get('/juizes/:juizId', juiz.findById)
    api.put('/juizes/:juizId', juiz.update)
    api.delete('/juizes/:juizId', juiz.delete)

}