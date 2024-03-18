const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());

//databse connection with mongoose
mongoose.connect('mongodb://localhost/todos',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Conncection Successfull'))
    .catch((err)=>console.log(err))

//routes
app.use('/todo',todoHandler);


function errorHandler(err, req,res,next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error:err});
}

app.listen(3000,()=>{
    console.log("listening on port 3000");
})