const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:
        {
            type:String
        },
        emailId:
        {
            type:String,
            required:true,
            unique : true,
            // validate(value)
            // {
            //     if(!validator.isEmail(value))
            //     {
            //         throw new Error("Invalid email address" +value);
            //     }
            // }
        },
        password:
        {
            type:String,
            required:true,
            unique : true

        },
        age:
        {
            type:Number
        },
        gender:
        {
            type:String,
            validate(value)
            {
                if(!["male","female","others"].include(value))
                {
                    throw new Error("Gender data is not valid");
                }
            },
        },
        photoUrl:
        {
            type:String
        },
        about:
        {
            type:String
        },
        skills:
        {
            type:[String],
        }
    }
);

module.exports = mongoose.model("User",userSchema);