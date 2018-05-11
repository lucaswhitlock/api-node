module.exports = (api) => {

    const projects = require('../controller/projects-controller')

    api.post('/projects', projects.create)
    api.get('/projects', projects.findAll)
    api.get('/projects/:projectId', projects.findById)
    api.put('/projects/:projectId', projects.update)
    api.delete('/projects/:projectId', projects.delete)

}