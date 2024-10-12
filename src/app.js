const express = require('express');

const app = express();


app.use("/",(req,res)=>{
    res.send("welcome to the server !");
});
 
app.use("/testing",(req,res)=>{
    res.send("Hello from the server!");
});


app.listen(3000,()=>{
    console.log("Servers is successfully listnening port numert 3000");
});
console.log("Starting a new project");