const mongoose  = require('mongoose');

const bookingSchema = new mongoose.Schema({
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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    timing:{
        type:String,
        required:true
    },
    noOfSeats:{
        type:Number,
        require:true,
        default:1
    },
    totalCost:{
        type:Number,
        required :true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["IN-PROCESS", "CANCELLED", "SUCCESSFULL"],
            message:"Invalid booking status"
        },
        default:"IN-PROCESS"
    }

}, {timestamps:true});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports= Booking;