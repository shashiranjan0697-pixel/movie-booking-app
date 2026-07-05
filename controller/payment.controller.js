const Booking = require("../model/booking.model");
const Payment = require("../model/payment.model");

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

const createPayment = async (req, res) =>{
    try{
        const booking = await Booking.findById(req.body.bookingId);
        if(!booking){
            errorRes.message = "No Booking Found";
            return res.status(404).json(errorRes);
        }

        const payment = await Payment.create({
            bookingId : req.body.bookingId,
            amount: req.body.amount,
        });

        let bookingTime = booking.createdAt;
        let currentTime = Date.now();

        if(currentTime-bookingTime > 20*1000*60){

            payment.status = "FAILED";
            await payment.save();

            errorRes.message = "Can't proceed the payment";
            errorRes.err = "Session Expired";
            return res.status(401).json(errorRes);
        }


        const amount = Number(req.body.amount);

        if (amount !== booking.totalCost){

            payment.status = "FAILED";
            payment.amount = req.body.amount;
            await payment.save();

            errorRes.message = "Invalid Amount";
            errorRes.data = payment;
            return res.status(400).json(errorRes); 
        }

        payment.status="SUCCESS";
        payment.amount = req.body.amount;
        booking.status = "SUCCESSFULL";

        await booking.save();
        await payment.save();

        successRes.message = "Payment Created Successfully.";
        successRes.data = payment;
        return res.status(200).json(successRes);

    }   catch(e){
        console.log(e);

        errorRes.message = e.message;
        errorRes.err = e.name;

        return res.status(500).json(errorRes);
    }
}


const getPayment = async (req, res) =>{
    try{
        if(!req.params.paymentId){
            errorRes.err = "PaymentId is not present."
            errorRes.message = "Malformed request  |  Bad request"
            return res.status(400).json(errorRes);
        }

        const payment = await Payment.findById(req.params.paymentId);

        if(!payment){
            errorRes.err = "Payment detail not found."
            return res.status(404).json(errorRes);
        }

        successRes.message = "Payment Details fetched Successfully."
        successRes.data = payment;
        return res.status(201).json(successRes);
    }   catch(e){
        console.log(e);

        errorRes.message = e.message;
        errorRes.err = e.name;

        return res.status(500).json(errorRes);
    }
}



module.exports = {
    createPayment,
    getPayment
}