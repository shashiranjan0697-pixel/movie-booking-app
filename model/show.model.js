const mongoose = require('mongoose');


const showSchema = new mongoose.Schema({
    theaterId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Theater"
        },
    movieId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"movie"
        },
    timing:{
        type:String,
        required:true
    },
    noOfSeats:{
        type:Number,
        required:true,
        default:200
    },
    price:{
        type:Number,
        required:true,
        default:250
    },
    formate:{
        type:String,
        default:"MULTIPLEX"
    }
}, {timestamps: true});

const Shows = mongoose.model("Shows", showSchema);
module.exports = Shows;
