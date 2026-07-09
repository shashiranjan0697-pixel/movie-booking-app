const Booking = require("../model/booking.model");
const User = require("../model/user.model");
const Show =require("../model/show.model");

const errorRes = {
    success:false,
    message :{},
    err:{}
}

const successRes = {
    success:true,
    message :{},
    data:{},
}

const createBooking = async (req, res) =>{
    try{
        const show = await Show.findOne({
            theaterId:req.body.theaterId,
            movieId:req.body.movieId,
            timing:req.body.timing
        });

        if (!show) {
            errorRes.message= "Show not found."
            return res.status(404).json(errorRes);
        }

        if (show.noOfSeats < req.body.noOfSeats) {
            errorRes.message= "Seats not available."
            return res.status(400).json(errorRes);
        }

        req.body.totalCost = (show.price * req.body.noOfSeats);
        
        const response = await Booking.create(
                {
                    ...req.body,
                    userId:req.user
                }
            );  

        show.noOfSeats -= req.body.noOfSeats;
        await show.save()
        
        successRes.data = response;
        successRes.message= "Booking created successfully."
        return res.status(201).json(successRes);

    }   catch(e){
        if (e.name === "ValidationError") {

        errorRes.message = "Validation failed";

        Object.keys(e.errors).forEach(key => {
            errorRes.err[key] = e.errors[key].message;
        });

        return res.status(400).json(errorRes);
        }

        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);
    }
}


const updateBooking = async (req, res) =>{
    try{
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if(!booking){
            errorRes.message= "Please enter valid booking id."
            errorRes.err= "Booking not found with given id."
            return res.status(404).json(errorRes);
        }

        successRes.data = booking;
        successRes.message= "Booking Updated successfully."
        return res.status(201).json(successRes);

    }   catch (e){
        if (e.name === "ValidationError") {

        errorRes.message = "Validation failed";

        Object.keys(e.errors).forEach(key => {
            errorRes.err[key] = e.errors[key].message;
        });

        return res.status(400).json(errorRes);
        }

        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);
    }
}

const getBookingById = async (req, res) =>{
    try{
    
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            errorRes.message= "Please enter valid booking id."
            errorRes.err= "Booking not found with given id."
            return res.status(404).json(errorRes);
        }

        successRes.data = booking;
        successRes.message= "Booking fetched successfully with given id."
        return res.status(200).json(successRes);

    }   catch(e){
        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);
    }
}


const getBooking = async (req, res) =>{
    try{
        
        const user = await User.findById(req.user);

        const filter = {};

        if(user.userRole === "CUSTOMER"){
            filter.userId   = req.user;
        }

        const booking = await Booking.find(filter);

        successRes.data = booking;
        successRes.message = booking.length
            ? "Bookings fetched successfully."
            : "You don't have any bookings.";
        return res.status(200).json(successRes);

    }   catch(e){
        errorRes.message = e.message;
        errorRes.err = e.name;
        return res.status(500).json(errorRes);
    }
}


module.exports = {
    createBooking ,
    updateBooking ,
    getBooking,
    getBookingById
}