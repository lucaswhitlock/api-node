module.exports = (api) => {

    const pai = require('../controller/pai-controller')

    api.post('/pais', pai.create)
    api.post('/pais/login', pai.login)
    api.get('/pais', pai.findAll)
    api.get('/pais/:paiId', pai.findById)
    api.put('/pais/:paiId', pai.update)
    api.delete('/pais/:paiId', pai.delete)

}