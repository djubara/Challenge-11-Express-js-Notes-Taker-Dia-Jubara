// Initialize express server
const express = require('express');

// Setting up a variable for the absolute path of the public folder
const path = require('path');

// Assigning the express server to the app variable so that we can use it in other files instead of using express() function again.
const app = express();

// Import node file system module
const fs = require('fs');




// Assigning the port number to the PORT variable so that we can use it in other files instead of using the port number again.
const PORT = process.env.PORT || 3001;



// Setting up the middleware for Public folder
app.use(express.static('public'));

//
// app.get('/api/notes', (req, res) => { });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));

// });



app.listen(PORT, () => {
    console.log(`Application server is listening on http://localhost port: ${PORT}!`);
});





// ********************************************************************************************************************

// Purpose: This file is the entry point for the application. It will start the server and listen for incoming requests.

const express = require('express');
const path = require('path');
const fs = require('fs');

const uuId = require('./helpers/randomId.js');

const db = require('./db/db.json');

const PORT = 3001;

// Create an instance of the express app.

const app = express();


// Middleware for parsing JSON and urlencoded form data

app.use(express.static('public/'));
app.use(express.json());


// Parse incoming string or array data

app.use(express.urlencoded({ extended: true }));

//html routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, + '/public/index.html'));
});

//notes route

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//api routes
app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read file' });
        }
        for (let i = 0; i < db.length; i++) {
            if (db[i].id === noteId) {
                return res.json(db[i]);
            }
        }
        res.json({ error: 'Note not found' });
    });
});



app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuId(),
        title: req.body.title,
        text: req.body.text
    }
    db.push(newNote);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes, "", 4), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json(newNote);
        });
    });
})


console.log(__dirname);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});