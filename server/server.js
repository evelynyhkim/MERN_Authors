const express = require('express')
const cors = require('cors')
const app = express()
const httpServer = require('http').createServer(app)
const socket = require('socket.io')
const Author = require('./models/author.model')

app.use(express.json(), express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:3000",
}))

require("./config/mongoose.config")
require('./routes/author.route')(app)

const portNum = 8000
app.listen(portNum, ()=>console.log(`Express app listening on port ${portNum}`))

const socketPortNum = 5000
httpServer.listen(socketPortNum, ()=>console.log(`httpServer listening on port ${socketPortNum}`))

const io=socket(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    }
})

io.on("connection", socket=>{
    console.log('new socket id: ' + socket.id)
    socket.on("DeleteRequest", arg=>{
        console.log("Liked " + arg)
        Author.findByIdAndDelete(arg)
        .then(author => {
            console.log('deleteOne')
            io.emit("DeleteAuthor", {_id: arg})
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    socket.on("Liked", arg=>{
        console.log("Liked " + arg)
        increaseLikes(arg)
    })

    function increaseLikes(id) {
        Author.findByIdAndUpdate(id, {$inc: { plikes: 1 }}, {new: true})
        .then(author => {
            io.emit("UpdateLikes", {_id: id, plikes: author.plikes})
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    socket.on("disconnect", ()=>{
        console.log("client disconnected ")
    })
})

