// Importing express

const express = require('express');

// Opening up the server to cross origins

const cors = require("cors");

// Importing the required middleware from the middleware page

const setupMiddleware = require('./middleware')

// const { v4: uuidv4 } = require('uuid');

// Creating the app by executing the express function

const app = express(); 

// Linking up the server to the middleware

setupMiddleware(app);

// Import the file that connects to the remote MongoDB database

require("./db");

// Linking to the routes 

require('./routes')(app);

// Switching on cors

app.use(cors());

module.exports=app;

