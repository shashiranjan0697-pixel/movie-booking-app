const express = require("express");
const router = express.Router();

const {signup, signin} = require("../controller/auth.controller");
const {validateAuthUser, validateSignInUser} = require("../middleware/auth.middleware");


router.post("/user/signup", validateAuthUser, signup);

router.post("/user/signin", validateSignInUser, signin);


module.exports = router;