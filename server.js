// Importing express and other modules

const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middleware

app.use(express.urlencoded({
    extended: true
}));

// Middleware for parsing JSON and urlencoded form data

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Setting up the server to listen on either environment port or 3001 whichever is available

app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}!`);
});