const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation")
const bcrypt = require("bcrypt");
app.use(express.json());

app.post("/signup",async (req,res)=>
{
    //validation of data
    try
    {
        validateSignUpData(req);
        
        const {firstName , lastName , emailId , password }=req.body;

        const passwordHash = await bcrypt.hash(password,10);
        
        console.log(passwordHash);

        const user = new User(
            {
                firstName , lastName , emailId , password : passwordHash
            });

        await user.save(); 
        res.send("User added successfully");
    }
     catch(err)
    {
        res.status(400).send("Error:"+err.message);
    }

});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Find the user by email ID
        const user = await User.findOne({ emailId });

        // If user does not exist
        if (!user) {
            return res.status(404).json({ message: "Email ID not found" });
        }

        // Compare the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password is valid
        if (isPasswordValid) {
            return res.status(200).json({ message: "Login Successfully" });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});
app.get("/user",async (req,res)=>
{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        if(user.length === 0)
        {
            res.status(404).send("user not found");
        }
        else
        {
            res.send(user);
        }
    }
    catch(err)
    {
        res.status(400).send("Can not find user");
    }
});

app.get("/feed",async(req,res)=>
{
    try
    {
        const users = await User.find({});
        res.send(users);
    }
    catch(err)
    {
        res.status(400).send("Can not find user");
    }
});


app.delete("/user",async(req,res)=>
{
    const userId = req.body.userId;
    try{
            const user = await User.findByIdAndDelete(userId);

            res.send("User deleted succusefull");
    }
    catch(err)
    {
        res.status(400).send("Can not find user");
    }
});


app.patch("/user/:userId",async (req,res)=>
{
    const userId = req.params?.userId;
    const data = req.body;
    try
    {
        const ALLOWED_UPDATES=[
        "userId","photoUrl","about","gender","age"
        ]

        const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
        );

        if(!isUpdateAllowed)
        {
            throw new Error("Update Not allowed")
        }
           
        const user = await User.findByIdAndUpdate({_id: userId }, data,{
            returnDocument:"after",
            runValidators:true,
        });
        console.log(user);
        res.send("User updated succusefull");
    }
    catch(err)
    {
        res.status(408).send("Can not find user");
    }
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected", err);
    });