// Initialize express server
const express = require('express');

// Assigning the express server to the app variable so that we can use it in other files instead of using express() function again.
const app = express();


// Assigning the port number to the PORT variable so that we can use it in other files instead of using the port number again.
const PORT = process.env.PORT || 3001;

// Setting up the middleware for Public folder
app.use(express.static('public', { extensions: ['html'] }));

// app.get('/api/notes', (req, res) => { });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));

// });



app.listen(PORT, () => {
    console.log(`Application server is listening on http://localhost port: ${PORT}!`);
});
