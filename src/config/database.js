const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://sujitdudhe2003:HWgk1FY68e4YDqoA@namstedevtender.wjvlg.mongodb.net/devTinder"
    );
};

module.exports=connectDB;
   
