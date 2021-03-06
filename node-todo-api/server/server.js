let {mongoose}=require("./db/mongoose")
let {ObjectID}=require("mongodb")
let {Todo}=require("./models/todo")
let {User}=require("./models/user")
let express= require("express")
let bodyParser=require("body-parser")
let app=express();
app.use(bodyParser.json())
app.post("/todos",(req,res)=>{
    let todo=new Todo({
        text:req.body.text
    })
    todo.save().then((doc)=>{
        res.status(200).send(doc)
    },(e)=>{
        res.status(400).send(e)
    })
});
app.get("/todos",(req,res)=>{

    Todo.find().then((todos)=>{
        res.send({todos})
    },(e)=>{
        res.status(400).send(e);
    });

});
app.get('/todos/:id',(req,res)=>{
    let id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id).then((todo)=>{
        if(todo){
            res.send({todo})
        }else{
          return  res.status(404).send()
        }
    }).catch((e)=>{
        res.status(400).send()
    })
})






app.listen(3000,()=>{
    console.log("Started on port 3000")
})

module.exports={app}