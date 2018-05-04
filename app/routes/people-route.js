module.exports = (api) => {

    const people = require('../controller/people-controller')

    api.post('/people', people.create)
    api.get('/people', people.findAll)
    api.get('/people/:personId', people.findById)
    api.put('/people/:personId', people.update)
    api.delete('/people/:personId', people.delete)

}