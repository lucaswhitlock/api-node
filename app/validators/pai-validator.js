const errors = [];
const Aluno = require('./../model/aluno-schema')

exports.validate = (pai) => {
    if (!pai) {
        return {
            status: 400,
            message: 'Erro ao receber dados! Formulário em branco.'
        }
    }
    if (!pai.filhoPai) {
        errors.push({
            status: 400,
            message: 'Aluno não informado!'
        })
    }
    let filho = await Aluno.findById(req.body.filhoPai);
    if (!filho) {
        errors.push({
            status: 403,
            message: 'Aluno informado não encontrado na base de dados!'
        })
    } else if (filho.paiAluno.length > 2) {
        errors.push({
            status: 403,
            message: 'Já existem dois responsáveis cadastrados para este aluno!'
        })
    }
    return errors.length > 0 ? errors : { status: 200, message: 'Responsável validado com sucesso!'};
}