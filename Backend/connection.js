const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://karankumargarg1610:AwzEz8uMRyLKPHkU@cluster0.2ez5z.mongodb.net/iKarus3D?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log("error connecting mongodb : "+ err);
})
