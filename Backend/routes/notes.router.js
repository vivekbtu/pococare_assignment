const { Router } = require("express");
const { TodoModel} = require(".././models/notes.model");

const todoRouter = Router();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2M4ZDMzNWJjZGEzZjY4MDZlMDEzNzMiLCJpYXQiOjE2Nzg3NDEyMDUsImV4cCI6MTY3ODc0MTIwNn0.7qJMOn4zkgvwqmq9vQ52qKOGvn6FVjrVf02K3PibuEs

todoRouter.get("/", async (req,res)=> {

    const getTodo = await TodoModel.find();
    res.send(getTodo);
})


todoRouter.get("/:todoId", async (req,res)=> {

    const { todoId } = req.params;
    const Id = Number(todoId);
    const getTodo = await TodoModel.find({"_id": `${Id}`});
    res.send(getTodo);
})

// Pending get
// todos/status?status=pending

todoRouter.get("/status", async (req, res)=> {
    const {status} = req.query;
    const data = status;

    try{
        const todos = await TodoModel.find({"status": `${data}`});
        res.send(todos)
    }
    catch(err){
        res.send("Something went wrong in get method");
        console.log(err);
    }
})

// Done get
// todos/status?status=done

todoRouter.get("/status", async (req, res)=> {
    const {status} = req.query;
    const data = status;

    try{
        const todos = await TodoModel.find({"status": `${data}`});
        res.send(todos)
    }
    catch(err){
        res.send("Something went wrong in get method");
        console.log(err);
    }
})


todoRouter.post("/create", async (req, res) => {
    const payload = req.body
    
    try{
        const new_todo = new TodoModel(payload)
        await new_todo.save()
        res.send({"msg" : "Todo created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong in Todo Post"})
    }
})

todoRouter.delete("/:todoId", async (req,res)=> {

    const { todoId } = req.params._id;
    const Id = (todoId);
    const getTodo = await TodoModel.findByIdAndDelete({"_id": `${Id}`});
    res.send("Todo Deleted");
})


module.exports = { todoRouter };