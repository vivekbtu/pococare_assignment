const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    name : {type: String, required:true},
    status : {type: String},
    tag : {type: String},
})

const TodoModel = mongoose.model("todo",todoSchema)

module.exports = { TodoModel}