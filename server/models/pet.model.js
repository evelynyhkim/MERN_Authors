const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    aname: {
        type: String,
        required: [true, 'Author must have a name'],
        minLength: [3, 'Author name must be at least 3 characters'],
        unique: true
    }
    // ptype: {
    //     type: String,
    //     required: [true, 'Author must have a type'],
    //     minLength: [3, 'Author type must be at least 3 characters']
    // },
    // pdescription: {
    //     type: String,
    //     required: [true, 'Author must have a description'],
    //     minLength: [3, 'Description must be at least 3 characters']
    // },
    // pskills: {
    //     type : Array, 
    //     default : [], 
    //     validate: {
    //         validator: function(val) {
    //             return val.length < 4
    //         },
    //         message: 'Author cannot have more than 3 skills'
    //     }
    // },
    // plikes: {
    //     type: Number,
    //     default: 0
    // }
}, {timestamp: true})

const Author = mongoose.model("Author", AuthorSchema)

module.exports = Author