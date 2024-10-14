const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize an array to store weather data  //
const projectData = {}

// Define the API endpoint for getting weather data  //
const PORT = 5050;

// Initialize an Express application  //
const app = express();

// Enable URL-encoded parsing for request bodies  (e.g., for GET requests)  //
app.use(bodyParser.urlencoded({extended:true}));
 // Enable JSON parsing for request bodies  (e.g., for POST requests)  //
app.use(bodyParser.json());

// Enable CORS for cross-origin requests  //
app.use(cors());

// Serve static files from the "website" directory  //
app.use(express.static('website'))


app.get('/api/weather', (req, res) => {
  res.send(projectData);
});

app.post('/api/weather', (req, res) => {

    const {temperature,date,userRes} = req.body;
    
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResult = userRes

    console.log(projectData)

    // Simulate a delay to mimic asynchronous behavior
    setTimeout(() => {
      console.log('Updating user list...');
      res.send(projectData);
    }, 2000);
});

app.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})