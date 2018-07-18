module.exports = (api) => {

    const fo = require('../controller/fo-controller')

    api.post('/fos', fo.create)
    api.get('/fos', fo.findAll)
    api.get('/fos/:foId', fo.findById)
    api.put('/fos/:foId', fo.update)
    api.delete('/fos/:foId', fo.delete)

}