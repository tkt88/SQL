const path = require("path");

// Need express to use router 
const express = require("express");

// create a new router 

const penrouter = express.Router();

// deconstruct router, linking to the functions on the controller page 
const {
    getPens,
    addPen,
    updatePen,
    removePen,
} = require("../controllers/PenController");

// linking CRUD functions above to the router 
penrouter
    .get("/:id?", getPens)
    .post("/", addPen)
    .put("/:id", updatePen)
    .delete("/:id", removePen);

module.exports = penrouter;