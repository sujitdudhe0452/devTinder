
const validator=require("validator")

const  validateSignUpData=(req)=>{

    const {firstName , lastName , emailId , password}=req.body;

    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(firstName.length <4 || firstName.length>50)
    {
        throw new Error("Name is length between 4 and 50");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Invalid email address");
    }
    //else if(!validator.isStrongPassword(password))
    //{
      //  throw new Error("please enter strong password");
    //}
};

module.exports=
{
    validateSignUpData,
};

