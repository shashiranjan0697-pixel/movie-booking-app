const express = require("express");
const router = express.Router();

const {signup, signin, reset} = require("../controller/auth.controller");
const {validateAuthUser, isAuthnticated,
    validateSignInUser, validateReset} = require("../middleware/auth.middleware");

const {updateRoleOrStatus} = require("../controller/user.controller");

router.post("/user/signup", validateAuthUser, signup);

router.post("/user/signin", validateSignInUser, signin);

router.patch("/user/reset", isAuthnticated, validateReset, reset);


module.exports = router;