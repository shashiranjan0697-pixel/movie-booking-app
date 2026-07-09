const Booking = require("../model/booking.model");
const Payment = require("../model/payment.model");
const User = require("../model/user.model");

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

        if(booking.status !== "IN-PROCESS"){
            errorRes.message = "Booking already done, no further payment you cn make.";
            return res.status(404).json(errorRes);
        }

        let bookingTime = booking.createdAt;
        let currentTime = Date.now();

        if(currentTime-bookingTime > 20*1000*60){
            booking.status = "CANCELLED";
            await booking.save();

            errorRes.message = "Can't proceed the payment";
            errorRes.err = "Session Expired";
            return res.status(401).json(errorRes);
        }

        const amount = Number(req.body.amount);

        if (amount !== booking.totalCost){

            errorRes.err = "Invalid Amount"
            errorRes.message = "please enter valid amount.";
            return res.status(400).json(errorRes);
        }

        const payment = await Payment.create({
            bookingId : req.body.bookingId,
            amount: req.body.amount,
        });    


        payment.status="SUCCESS";
        payment.amount = req.body.amount;
        booking.status = "SUCCESSFULL";

        await booking.save();
        await payment.save();

        successRes.message = "Payment Created Successfully.";
        successRes.data = {
            Booking : booking,
            paymentDetail : payment
        }
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

        const payment = await Payment.findById(req.params.paymentId).populate('bookingId');

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



const getAllPayment = async (req, res) => {
    try {
        console.log("Reached getAllPayment");
        const user = await User.findById(req.user);

        const filter = {};

        if (user.userRole === "CUSTOMER") {
            filter.userId = req.user;
        }

        const bookings = await Booking.find(filter, { _id: 1 });

        const bookingIds = bookings.map((booking) => booking._id);

        const payments = await Payment.find({
            bookingId: { $in: bookingIds }
        });

        successRes.data = payments;
        successRes.message = payments.length
            ? "All Payments fetched successfully."
            : "No payments found.";

        return res.status(200).json(successRes);

    } catch (e) {
        errorRes.message = e.message;
        errorRes.err = e.name;

        return res.status(500).json(errorRes);
    }
};



module.exports = {
    createPayment,
    getPayment,
    getAllPayment
}