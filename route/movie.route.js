const express = require("express");
const router = express.Router();

const {createMovie, deleteMovie, movieGet, movieUpdate, findMovie} 
    =  require("../controller/movie.controller");

const {movieMiddleware} = require("../middleware/movie.validate")

const {isAuthnticated, isClientOrAdmin,
    isClient, isAdmin} 
    = require("../middleware/auth.middleware");

router.post("/movies/create", 
    isAuthnticated, isClientOrAdmin,
    movieMiddleware, createMovie);

router.delete("/movies/delete/:id", 
    isAuthnticated, isClientOrAdmin, deleteMovie);

router.get("/movies/get/:id", movieGet);

router.put("/movies/update/:id",
    isAuthnticated, isClientOrAdmin, movieUpdate);

router.patch("/movies/update/:id",
    isAuthnticated, isClientOrAdmin, movieUpdate);

router.get("/movies", findMovie);

module.exports = router;