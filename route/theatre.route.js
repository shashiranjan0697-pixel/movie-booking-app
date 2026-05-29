const express = require("express");
const router = express.Router(); 


const {createTheater, deleteTheater, getTheater, 
    updateTheater, getAllTheater, addMovieInTheater,
    getMovieStreamingInTheater, getMovieInATheater} = require("../controller/theater.controller");

const {validateTheater, validateMovieUpdateInTheater} = require("../middleware/theater.middleware")


router.post("/theaters/create", validateTheater, createTheater);

router.delete("/theaters/delete/:id", deleteTheater);

router.get("/theaters/get/:id", getTheater);

router.put("/theaters/update/:id", updateTheater);

router.patch("/theaters/update/:id", updateTheater);

router.get("/theaters/all", getAllTheater);

router.patch("/theaters/update/:id/movies", validateMovieUpdateInTheater, addMovieInTheater);

router.get("/theaters/get/:id/movies", getMovieStreamingInTheater);

router.get('/theaters/get/:theaterID/movies/:movieId', getMovieInATheater);


module.exports = router;