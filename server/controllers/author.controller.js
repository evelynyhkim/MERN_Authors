const Author = require('../models/author.model')

module.exports = {
    getAll: (req, res) => {
        Author.find()
        .then(authors => {
            console.log('getAll')
            res.json(authors)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    createOne: (req, res) => {
        //ensuring name is unique
        Author.exists({aname: req.body.aname}, function(err, result){
            if(err) res.status(400).json(err)
            else {
                if(result) {
                    console.log('Author exists')
                    res.status(409).json({"errors":{"aname": {"message":"Sorry, the name is already taken. Choose a different name."}}})
                }
                else {
                    Author.create(req.body)
                    .then(author => {
                        console.log('createOne')
                        res.json(author)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json(err)
                    })
                }
            }
        })
    },
    getOne: (req, res) => {
        Author.findById(req.params.id)
        .then(author => {
            console.log('getOne')
            res.json(author)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    updateOne: (req, res) => {
        console.log('updateOne')
        Author.findById(req.params.id)
        .then(author => {
            if(author.aname == req.body.aname) {// user is not requesting to update name
                Author.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true})
                .then(author => {
                    res.json(author)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
            }
            else {// user requesting to update name; need to check if name is unique
                Author.exists({aname: req.body.aname}, function(err, result){
                    if(err) res.status(400).json(err)
                    else if(result) res.status(409).json({"errors":{"aname": {"message":"Sorry, the name is already taken. Choose a different name."}}})
                    else {
                        Author.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true})
                        .then(author => {
                            res.json(author)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json(err)
                        })
                    }
                })
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },    
    deleteOne: (req, res) => {
        Author.findByIdAndDelete(req.params.id)
        .then(author => {
            console.log('deleteOne')
            res.json(author)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    increaseLikes: (id) => {
        Author.findByIdAndUpdate(id, {$inc: { plikes: 1 }}, {new: true})
        .then(author => {
            console.log(author)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        }) 
    }
}