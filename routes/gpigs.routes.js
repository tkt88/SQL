const path = require("path");

// Need express to use router 
const express = require("express");

// create a new router 
const gPigrouter = express.Router();

// deconstruct router, linking to the functions on the controller page 
const {
    getGPigs,
    addGPig,
    updateGPig,
    removeGPig,
} = require('../controllers/GPigController.js');


// linking CRUD functions above to the router 
gPigrouter
    .get("/:id?", getGPigs)
    .post("/", addGPig)
    .put("/:id", updateGPig)
    .delete("/:id", removeGPig);

module.exports = gPigrouter;