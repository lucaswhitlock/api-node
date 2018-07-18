module.exports = (api) => {

    const tipoFO = require('../controller/tipo-fo-controller')

    api.post('/tipofos', tipoFO.create)
    api.get('/tipofos', tipoFO.findAll)
    api.get('/tipofos/:tipofoId', tipoFO.findById)
    api.put('/tipofos/:tipofoId', tipoFO.update)
    api.delete('/tipofos/:tipofoId', tipoFO.delete)

}