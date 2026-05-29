const mongoose = require("mongoose");


const theaterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    markedlace:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true,
        minlength: 6,
        maxlength: 6
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    movies:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : "movie",
    }
},{timestamps:true});

const Theater = mongoose.model("Theater", theaterSchema);
module.exports = Theater;