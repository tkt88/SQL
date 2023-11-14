const path = require("path");

module.exports = function(app){

    // Makes the start of the URL
    const API_ENDPOINT = "/api";

    // Create a route for guinea pigs and pens separately 

    app.use(`${API_ENDPOINT}/gpigs`, require("./gpigs.routes"));
    app.use(`${API_ENDPOINT}/pens`, require("./pens.routes"));

    // If missed all other routes, send a 404

    app.all("*", (req, res)=>{
        res.sendStatus(404);
    });
};