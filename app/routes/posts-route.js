module.exports = (api) => {

    const posts = require('../controller/posts-controller')

    api.post('/posts', posts.create)
    api.get('/posts', posts.findAll)
    api.get('/posts/:postId', posts.findById)
    api.put('/posts/:postId', posts.update)
    api.delete('/posts/:postId', posts.delete)

}