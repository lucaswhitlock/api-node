module.exports = (api) => {

    const professor = require('../controller/professor-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/professores/login', professor.login)
    api.post('/professores', seguranca.verify, professor.create)
    api.get('/professores', seguranca.verify, professor.findAll)
    api.get('/professores/:professorId', seguranca.verify, professor.findById)
    api.put('/professores/:professorId', seguranca.verify, professor.update)
    api.delete('/professores/:professorId', seguranca.verify, professor.delete)

}