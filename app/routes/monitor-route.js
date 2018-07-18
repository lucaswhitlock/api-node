module.exports = (api) => {

    const monitor = require('../controller/monitor-controller')

    api.post('/monitores', monitor.create)
    api.post('/monitores/registrar', monitor.register)
    api.get('/monitores/autenticar', monitor.autenticate)
    api.get('/monitores', monitor.findAll)
    api.get('/monitores/:monitorId', monitor.findById)
    api.put('/monitores/:monitorId', monitor.update)
    api.delete('/monitores/:monitorId', monitor.delete)

}