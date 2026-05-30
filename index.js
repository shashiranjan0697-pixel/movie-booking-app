const express = require("express");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const dbConnect = require("./config/database");
const { urlencoded } = require("body-parser");

const movieRoute = require("./route/movie.route");
const theaterRoute = require("./route/theatre.route");
const authRoute = require("./route/auth.route");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mba/api/v1", movieRoute);
app.use("/mba/api/v1", theaterRoute);
app.use("/mba/api/v1", authRoute);

const port = process.env.PORT || 3000;

dbConnect();

app.listen( port , (req, res) =>{
    console.log(`Server successfully hosted on port : ${port}`);
})
