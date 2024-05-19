// Initialize express server
const express = require('express');

// Setting a variable for the absolute path of the public folder
const path = require('path');

// Assigning the express server to the app variable so that we can use it in other files instead of using express() function again.
const app = express();


// Assigning the port number to the PORT variable so that we can use it in other files instead of using the port number again.
const PORT = process.env.PORT || 3001;

// Setting up the middleware for Public folder
// app.use(express.static('public'));

// const fs = require('fs');

// app.get('/api/notes', (req, res) => { });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));

// });



app.listen(PORT, () => {
    console.log(`Application server is listening on http://localhost port: ${PORT}!`);
});





// ********************************************************************************************************************

// Purpose: This file is the entry point for the application.It will start the server and listen for incoming requests.

// const express = require('express');

// const fs = require('fs');

// const uuid = require('./helpers/randomId.js');

// const db = require('./db/db.json');

// const PORT = 3001;

// // Create an instance of the express app.

// const app = express();


// // Middleware for parsing JSON and urlencoded form data

// app.use(express.static('public'));
// app.use(express.json());


// app.listen(PORT, () => {
//     console.log(`API server now on port ${PORT}!`);
// });