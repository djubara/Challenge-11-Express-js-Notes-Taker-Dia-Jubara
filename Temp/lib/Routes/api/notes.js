// Require the fs module
const fs = require('fs');


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
        // Read the request body
        const newNote = req.body;
        // Push the new note to the data variable
        notes.push(newNote);
        // Write the data variable to the db.json file
        fs.writeFile(path.join(appDir, "/lib/db/db.json"), JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            // Send the response
            res.status(200).send();
        });
        // Assign data to a variable

        // Read the request body

        // Push the new note to the data variable

        // Write the data variable to the db.json file

        // Send the response
    });

    // DELETE /api/notes/:id

})

