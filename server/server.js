/* server.js
This is the script for the express server that runs. All console logs will end
up in the terminal in which it was instantiated.

Dependencies:
- jquery
- express
- body-parser
*/

// ==========TOGGLES==========
const DEBUGGING = true;

// ==========Server Setup==========

// Assign server constants
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Prepare server
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Module assignments
memory = require('./modules/memory');
history = require('./modules/history');

// =========='GET', 'POST', 'PUT', and 'DELETE'==========

// -----'GET' requests-----
// Memory recall
app.get('/memory-recall', (req, res) => {
    debug(loaded('/memory-recall')); // *** Debug ***
    debug(memory.valueOf()); // *** Debug ***
    res.send(memory.valueOf());
});

// -----'POST' requests-----
// Memory store
app.post('/memory-store', (req, res) => {
    debug(loaded('/memory-store')); // *** Debug ***
    memory = Object.keys(req.body)[0];
    debug(memory); // *** Debug ***
    res.sendStatus(200);
});

// Memory clear
app.post('/memory-clear', (req, res) => {
    debug(loaded('/memory-clear')); // *** Debug ***
    memory = '0';
    debug(memory); // *** Debug ***
    res.sendStatus(200);
})

// ==========The app listener goes at the bottom... I think==========
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// ==========Miscellaneous debugging tools==========

function debug(item) {
    if (DEBUGGING) console.log(item);
}

function loaded(thing) {
    let message = "Loaded";
    if (thing) message += ` ${thing}`;
    return message;
}