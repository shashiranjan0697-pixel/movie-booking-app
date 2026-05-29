const express = require("express");
const router = express.Router();

const {createMovie, deleteMovie, movieGet, movieUpdate, findMovie} = require("../controller/movie.controller");

const {movieMiddleware} = require("../middleware/movie.validate")

router.post("/movies/create", movieMiddleware, createMovie);

router.delete("/movies/delete/:id", deleteMovie);

router.get("/movies/get/:id", movieGet);

router.put("/movies/update/:id", movieUpdate);

router.patch("/movies/update/:id", movieUpdate);

router.get("/movies", findMovie);

module.exports = router;