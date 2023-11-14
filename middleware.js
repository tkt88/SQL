const express = require("express"); // express server; this is a constructor

module.exports = function(app){

    app.use(express.static("public"));

    app.use(express.json()); //all json is properly passed

}