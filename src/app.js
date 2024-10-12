const express = require('express');

const app = express();



app.use("/testing",(req,res)=>{
    res.send("Hello from the server!");
});

app.get("/user",(req,res)=>
{
    res.send({firstname:"sujit",lastname:"dudhe"})
})

app.post("/user",(req,res)=>
    {
        console.log("save to the data database");
        res.send("data save successfully");
    })

    
    app.delete("/user",(req,res)=>
        {
            console.log("delete to the data database");
            res.send("data delete successfully");
        })
    
    
        
    
app.listen(3000,()=>{
    console.log("Servers is successfully listnening port numert 3000");
});
console.log("Starting a new project");