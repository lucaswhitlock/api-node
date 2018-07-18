module.exports = (api) => {

    const atenuante = require('../controller/atenuante-controller')

    api.post('/atenuantes', atenuante.create)
    api.get('/atenuantes', atenuante.findAll)
    api.get('/atenuantes/:atenuanteId', atenuante.findById)
    api.put('/atenuantes/:atenuanteId', atenuante.update)
    api.delete('/atenuantes/:atenuanteId', atenuante.delete)

}