const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    aname: {
        type: String,
        required: [true, 'Author must have a name'],
        minLength: [3, 'Author name must be at least 3 characters'],
        unique: true
    }
}, {timestamp: true})

const Author = mongoose.model("Author", AuthorSchema)

module.exports = Author