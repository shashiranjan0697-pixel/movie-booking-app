
const errorRes = {
    success:false,
    message :"Malformed request  |  Bad request",
    err:{},
}

exports.validateAuthUser = async (req, res, next) =>{

    if(!req.body.name){
        errorRes.err = "Name of the user isn't present in request body."
        return res.status(400).json(errorRes);
    }

    if(!req.body.email){
        errorRes.err = "Email of the user isn't present in request body."
        return res.status(400).json(errorRes);
    }

    if(!req.body.password){
        errorRes.err = "Password of the user isn't present in request body."
        return res.status(400).json(errorRes);
    }

    if(req.body.password.length<6){
        errorRes.err = "Password length expected above five."
        return res.status(400).json(errorRes);
    }

    next();
}