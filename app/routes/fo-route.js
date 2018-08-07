module.exports = (api) => {

    const fo = require('../controller/fo-controller')
    const seguranca = require('../etc/check-identity')

    api.post('/fos',seguranca.verify,  fo.create)
    api.get('/fos',seguranca.verify,  fo.findAll)
    api.get('/fos/:foId',seguranca.verify,  fo.findById)
    api.put('/fos/:foId',seguranca.verify,  fo.update)
    api.delete('/fos/:foId',seguranca.verify,  fo.delete)

}