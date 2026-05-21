
const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{},
}

exports.movieMiddleware = async (req, res, next) =>{

    if(!req.body.title){
        errorRes.err = "Title of the movie is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.description){
        errorRes.err = "Description of the movie is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.cast  || req.body.cast.length<=0 || !(req.body.cast instanceof Array)){
        errorRes.err = "Cast of the movie is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.director  || req.body.director.length<=0 || !(req.body.director instanceof Array)){
        errorRes.err = "Director of the movie is not present."
        return res.status(400).json(errorRes);
    }

    if(!req.body.releasedOn ){
        errorRes.err = "Released date of the movie is not present."
        return res.status(400).json(errorRes);
    }

    next();
}