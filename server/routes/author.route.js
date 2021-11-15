const AuthorController = require('../controllers/author.controller')

module.exports = (app) => {
    app.get('/api/authors', AuthorController.getAll)
    app.post('/api/authors/new', AuthorController.createOne)
    app.get('/api/authors/:id', AuthorController.getOne)
    app.put('/api/authors/:id/edit', AuthorController.updateOne)
    app.delete('/api/authors/:id/delete', AuthorController.deleteOne)
}
