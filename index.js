const express = require("express");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const dbConnect = require("./config/database");
const { urlencoded } = require("body-parser");

const movieRoute = require("./route/movie.route");
const theaterRoute = require("./route/theatre.route");
const authRoute = require("./route/auth.route");
const userRoute = require("./route/user.route");
const bookingRoute = require("./route/booking.route");
const showRoute = require("./route/show.route");
const paymentRoute = require("./route/payment.route");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mba/api/v1", movieRoute);
app.use("/mba/api/v1", theaterRoute);
app.use("/mba/api/v1", authRoute);
app.use("/mba/api/v1", userRoute);
app.use("/mba/api/v1", bookingRoute);
app.use("/mba/api/v1", showRoute);
app.use("/mba/api/v1", paymentRoute);


const port = process.env.PORT || 3000;

dbConnect();

app.listen( port , (req, res) =>{
    console.log(`Server successfully hosted on port : ${port}`);
})
