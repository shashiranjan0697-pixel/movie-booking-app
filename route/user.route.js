const express = require('express');
const router = express.Router();

const {updateRoleOrStatus} = require("../controller/user.controller");
const {validateRoleStatusUpdate} = require("../middleware/user.middleware");
const {isAdmin, isAuthnticated} = require('../middleware/auth.middleware')

router.patch("/user/update/role/:id",
                isAuthnticated,
                isAdmin,
                validateRoleStatusUpdate, 
                updateRoleOrStatus);


module.exports = router;