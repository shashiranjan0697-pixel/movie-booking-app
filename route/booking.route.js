const express = require('express');
const router = express.Router();

const bookingController = require("../controller/booking.controller");
const bookingMiddleware = require("../middleware/booking.middleware")
const {isAuthnticated, isClientOrAdmin} = require("../middleware/auth.middleware");

// 
router.post("/bookings/create", 
        isAuthnticated,
        bookingMiddleware.validateBooking,
        bookingController.createBooking
    );
// update by id
router.patch("/bookings/update/:id", 
        isAuthnticated,
        bookingMiddleware.canChangeStatus,
        bookingController.updateBooking
    );
// get booking
router.get("/bookings", 
        isAuthnticated,
        bookingController.getBooking
    );

router.get("/bookings/:id", 
        isAuthnticated,
        isClientOrAdmin,
        bookingController.getBookingById
    );



module.exports = router;