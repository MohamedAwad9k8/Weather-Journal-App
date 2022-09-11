// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


/* Setup Server */

//setting the port
const port = 8000;
//spin up the server
const server = app.listen(port,listening);
//call back function
function listening(){
    console.log("Server is running!");
    console.log(`Running on localhost:${port}`);
}

/* Routes */

//GET method route
app.get("/getData", function (req,res){
    res.json(projectData);
    console.log("data sent!")
});

//POST method route
app.post("/postData", function (req,res){
    let newData = req.body;
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
    console.log(req.body);
});