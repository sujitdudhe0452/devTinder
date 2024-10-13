const jwt = require('jsonwebtoken');
const User = require("../models/user");


const userAuth =async(req,res,next)=>
{
        try
        {  const {token} = req.cookies;
            
            if(!token)
            {
                throw new Error ("token not found");
            }
            const decode = await jwt.verify(token,"DEVtinder$12");

            const {_id} = decode;

            const user = await User.findById(_id);
            if(!user)
            {
                throw new Error ("User Not found");
            }
            req.user=user;
            next();
        } catch(err)
        {
            res.status(400).send("ERROR: "+err.message);
        }
        
};

module.exports={
    userAuth,
}