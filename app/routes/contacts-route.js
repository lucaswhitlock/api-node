module.exports = (api) => {

    const contact = require('../controller/contacts-controller')

    api.post('/contacts', contact.create)
    api.get('/contacts', contact.findAll)
    api.get('/contacts/:contactId', contact.findById)
    api.put('/contacts/:contactId', contact.update)
    api.delete('/contacts/:contactId', contact.delete)

}