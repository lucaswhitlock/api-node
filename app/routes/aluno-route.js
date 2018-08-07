module.exports = (api) => {

    const aluno = require('../controller/aluno-controller')

    api.post('/alunos', aluno.create)
    api.get('/alunos', aluno.findAll)
    api.get('/alunos/:alunoId', aluno.findById)
    api.put('/alunos/:alunoId', aluno.update)
    api.delete('/alunos/:alunoId', aluno.delete)

}