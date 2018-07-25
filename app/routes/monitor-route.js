module.exports = (api) => {

    const monitor = require('../controller/monitor-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/monitores/login', monitor.login)
    api.post('/monitores', seguranca.verify, monitor.create)
    api.get('/monitores', seguranca.verify, monitor.findAll)
    api.get('/monitores/:monitorId', seguranca.verify, monitor.findById)
    api.put('/monitores/:monitorId', seguranca.verify, monitor.update)
    api.delete('/monitores/:monitorId', seguranca.verify, monitor.delete)

}