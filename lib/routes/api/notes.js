// Require the fs module
const fs = require('fs');

// Require the randomId function
const randomId = require('../../utils/randomId');


// Get the root path of the application

const path = require('path');

// Create a variable to store the path to the application directory

const appDir = path.dirname(require.main.filename)

// Desc: Notes API routes

const router = require('express').Router();
module.exports = router;

// GET /api/notes

router.get('/', (req, res) => {
    res.sendFile(path.join(appDir, "/lib/db/db.json"));
});

// PUT /api/notes
router.put('/', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(appDir, "/lib/db/db.json"), 'utf8', (err, dbData) => {
        if (err) {
            console.error(err);
            return;
        }
        // Assign data to a variable
        const notes = JSON.parse(dbData);

        // Assign a random id to the new note
        const newNoteId = randomId();

        // Read the request body
        const newNote = { ...req.body, id: newNoteId };
        // Push the new note to the data variable
        notes.push(newNote);
        // Write the data variable to the db.json file
        fs.writeFile(path.join(appDir, "/lib/db/db.json"), JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            // Send the response
            res.status(200).send("New note was added successfully with id: " + newNoteId);
        });

    });

});

// DELETE /api/notes/:id

router.delete('/:id', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(appDir, "/lib/db/db.json"), 'utf8', (err, dbData) => {
        if (err) {
            console.error(err);
            return;
        }
        // Assign data to a variable
        const notes = JSON.parse(dbData);
        // Filter the notes array to remove the note with the id that matches the request parameter
        const newNotes = notes.filter(note => note.id !== req.params.id);
        // Write the new data variable to the db.json file
        fs.writeFile(path.join(appDir, "/lib/db/db.json"), JSON.stringify(newNotes), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            // Send the response
            res.status(200).send("Note with id: " + req.params.id + " was deleted successfully.");
        });

    });
});

router.delete('/:id', (req, res) => { });



