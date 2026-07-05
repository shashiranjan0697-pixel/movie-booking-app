const express = require("express");
const router = express.Router();

const paymentController = require("../controller/payment.controller");
const paymentMiddleware = require("../middleware/payment.middleware");
const {isAuthnticated, isClientOrAdmin} = require("../middleware/auth.middleware");

router.post("/payment/create", 
        isAuthnticated,
        paymentMiddleware.validate,
        paymentController.createPayment
    );

router.get("/payment/:paymentId",
        isAuthnticated,
        paymentController.getPayment
);

module.exports = router;