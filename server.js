// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`)
})

app.post('/sendweather', (req, res) => {
    projectData.temp = req.body.data.main.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;

    res.send(projectData)
})

app.get('/all', (req, res) => {
    res.send(projectData)
})
