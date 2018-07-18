module.exports = (api) => {

    const agravante = require('../controller/agravante-controller')

    api.post('/agravantes', agravante.create)
    api.get('/agravantes', agravante.findAll)
    api.get('/agravantes/:agravanteId', agravante.findById)
    api.put('/agravantes/:agravanteId', agravante.update)
    api.delete('/agravantes/:agravanteId', agravante.delete)

}