module.exports = (api) => {

    const aluno = require('../controller/aluno-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/alunos', seguranca.verify, aluno.create)
    api.get('/alunos', seguranca.verify, aluno.findAll)
    api.get('/alunos/:alunoId', seguranca.verify, aluno.findById)
    api.put('/alunos/:alunoId', seguranca.verify, aluno.update)
    api.delete('/alunos/:alunoId', seguranca.verify, aluno.delete)

}