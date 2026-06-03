const express = require("express");
const router = express.Router(); 


const {createTheater, deleteTheater, getTheater, 
    updateTheater, getAllTheater, addMovieInTheater,
    getMovieStreamingInTheater, getMovieInATheater} 
    = require("../controller/theater.controller");

const {validateTheater, validateMovieUpdateInTheater} 
        = require("../middleware/theater.middleware")

const {isAuthnticated, isClientOrAdmin,
    isClient, isAdmin} 
    = require("../middleware/auth.middleware");

router.post("/theaters/create",
        isAuthnticated, isClientOrAdmin,
        validateTheater, createTheater);

router.delete("/theaters/delete/:id",
    isAuthnticated, isClientOrAdmin, deleteTheater);

router.get("/theaters/get/:id", getTheater);

router.put("/theaters/update/:id",
    isAuthnticated, isClientOrAdmin, updateTheater);

router.patch("/theaters/update/:id",
    isAuthnticated, isClientOrAdmin, updateTheater);

router.get("/theaters/all", getAllTheater);

router.patch("/theaters/update/:id/movies",
    isAuthnticated, isClientOrAdmin,
    validateMovieUpdateInTheater, addMovieInTheater);

router.get("/theaters/get/:id/movies", getMovieStreamingInTheater);

router.get('/theaters/get/:theaterID/movies/:movieId', getMovieInATheater);


module.exports = router;