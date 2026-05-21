const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB () {
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("DB connected Successfully.")
    }
    catch(err){
        console.log("connection FAil.")
        console.log("Error : ",err);

        process.exit(1);
    }
}

module.exports = connectDB;