const Payment = require("../model/payment.model"); 

const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{}
}


const  validate = async (req, res, next) =>{

    if(!req.body.bookingId){
        errorRes.err = "BookingId is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.amount){
        errorRes.err = "Amount is not present."
        return res.status(400).json(errorRes);
    }

    next();

}


module.exports = {
    validate
}