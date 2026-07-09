const Theater = require("../model/theater.model");
const User = require("../model/user.model");


const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{},
}

const validateBooking = async (req, res, next) =>{
    if(!req.body.theaterId){
        errorRes.err = "TheaterId not found in reqest body."
        return res.status(400).json(errorRes);
    }

    const theater = await Theater.findById(req.body.theaterId);
    
    if (!theater) {
        errorRes.err = "Theater not found with the given ID";
        return res.status(404).json(errorRes);
    }            

    if(!req.body.movieId){
        errorRes.err = "movieId not found in reqest body."
        return res.status(400).json(errorRes);  
    }

    if(!theater.movies.includes(req.body.movieId)){
        errorRes.err = "Movie is not streaming in this theater."
        return res.status(400).json(errorRes);
    }

    if(!req.body.timing){
        errorRes.err = "Timing not found in reqest body."
        return res.status(400).json(errorRes);  
    }

    

    next();
}


const canChangeStatus = async (req, res, next) =>{

    const user = await User.findById(req.user);

    if (
        user.userRole === "CUSTOMER" &&
        req.body.status &&
        req.body.status !== "CANCELLED"
    ) {
        errorRes.err = "Coustomer are only authorised to cancell booking."
    return res.status(403).json(errorRes);
    }
    
    next();
    
}  


module.exports = {
    validateBooking,
    canChangeStatus
}