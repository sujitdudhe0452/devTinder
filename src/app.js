const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
const {userAuth}=require("./middleware/auth");

app.use(express.json());
app.use(cookieParser()); 
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
            //create JWT Toke

            //Add the token to cookie and send the response back to the user

            const token = await jwt.sign({ _id : user._id}, "DEVtinder$12",{exiresIn:"1h",

            });
            console.log(token);

            res.cookie("token",token);
            return res.status(200).json({ message: "Login Successfully" });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

app.get("/profile",userAuth, async (req, res) => 
    {
        try{
            const user = req.User;
            res.send(user);
        }catch(err)
        {
            res.status(400).send("ERROR: "+err.message);
        }
    });
        
app.post("/sendConnnectionRequest",userAuth, async(req,res)=>
{
    console.log("Connection sending request");
    res.send("Connection request send");
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