module.exports = (api) => {

  const psico = require('../controller/psico-controller')
  const seguranca = require('../etc/check-identity')

  api.post('/psicologo', seguranca.verify, psico.create)
  api.get('/psicologo', seguranca.verify, psico.findAll)
  api.get('/psicologo/:psicoId', seguranca.verify, psico.findById)
  api.put('/psicologo/:psicoId', seguranca.verify, psico.update)
  api.delete('/psicologo/:psicoId', seguranca.verify, psico.delete)

}