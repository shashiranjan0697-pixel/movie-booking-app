const Theater = require("../model/theater.model");


exports.updateMovieInTheater = async (theaterId, movieIds, insert) => {

    const theater = await Theater.findById(theaterId);

    if (!theater) {
        throw new Error("Theater not found");
    }

    if (insert) {
        movieIds.forEach(movieId => {
            if(!theater.movies.includes(movieId)){
                theater.movies.push(movieId);
            }
            
        });

    } else {
        // let savedMovies = theater.movies;
        theater.movies = theater.movies.filter(
            id => !movieIds.includes(id.toString())
        );
        // theater.movies = savedMovies;
    }

    await theater.save();

    return theater.populate("movies");
};