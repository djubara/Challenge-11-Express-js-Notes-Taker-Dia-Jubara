// Initiate the router and export it

const router = require('express').Router();
module.exports = router;

// Import the notes.js file from the api folder

const notes = require('./api/notes.js');

// Use the notes.js file in the api folder

router.use('/api/notes', notes);