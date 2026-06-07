const express = require('express');
const router = express.Router();
const {isClientOrAdmin, isAuthnticated} = require("../middleware/auth.middleware");
const showMiddleware = require("../middleware/shows.middleware");
const showController = require("../controller/shows.controller"); 

router.post("/shows/create",
    showMiddleware.validateShow,
    isAuthnticated,
    isClientOrAdmin,
    showController.create
);

router.get("/shows",
    showController.getShows
);

router.delete("/shows/delete/:id",
    isAuthnticated,
    isClientOrAdmin,
    showController.deleteShow
);

router.patch("/shows/update/:id",
    isAuthnticated,
    isClientOrAdmin,
    showMiddleware.validateUpdateRequest,
    showController.updateShow
);



module.exports = router;