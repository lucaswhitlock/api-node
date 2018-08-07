module.exports = (api) => {

  const psico = require('../controller/psico-controller')

  api.post('/psicologo', psico.create)
  api.get('/psicologo', psico.findAll)
  api.get('/psicologo/:psicoId', psico.findById)
  api.put('/psicologo/:psicoId', psico.update)
  api.delete('/psicologo/:psicoId', psico.delete)

}