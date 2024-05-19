const router = require('express').Router();
const path = require('path');

// Middleware for parsing JSON and urlencoded form data

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
module.exports = router;