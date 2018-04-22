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
let memory = require('./modules/memory');
let history = require('./modules/history');
let expression = require('./modules/expression');
let answer = require('./modules/answer');
let formula = require('./modules/formula');

// =========='GET', 'POST', 'PUT', and 'DELETE'==========

// -----'GET' requests-----
// Get 'expression' module
app.get('/get-expression', (req, res) => {
    debug(loaded('/get-expression'));
    res.send(expression);
});

// Get 'answer' module
app.get('/get-answer', (req, res) => {
    debug(loaded('/get-answer'));
    res.send(answer);
});

// Get 'formula' module
app.get('/get-formula', (req, res) => {
    debug(loaded('/get-formula'));
    res.send(formula);
});

// Memory recall
app.get('/memory-recall', (req, res) => {
    debug(loaded('/memory-recall')); // *** Debug ***
    debug(memory.valueOf()); // *** Debug ***
    res.send(memory.valueOf());
});

// Recall all history
app.get('/history-list', (req, res) => {
    debug(loaded('/history-list')); // *** Debug ***
    res.send(history);
});

// Return the answer to the current expression to the client
app.get('/get-answer', (req, res) => {
    debug(loaded('/get-answer')); // *** Debug ***
    debug(answer);
    res.send(answer);
});

// -----'POST' requests-----
// Set 'expression' module
app.post('/set-expression', (req, res) => {
    debug(loaded('/set-expression'));
    expression = req.body;
    res.sendStatus(200);
});

// Set 'answer' module
app.post('/set-answer', (req, res) => {
    debug(loaded('/set-answer'));
    answer = req.body;
    res.sendStatus(200);
});

// Set 'formula' module
app.post('/set-formula', (req, res) => {
    debug(loaded('/set-formula'));
    formula = req.body;
    res.sendStatus(200);
});

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
    if (req.body == 'delete') memory = '0';
    debug(memory); // *** Debug ***
    res.sendStatus(200);
});

// Append answer to history
app.post('/history-add', (req, res) => {
    debug(loaded('/history-add')); // *** Debug ***
    history.push(req.body);
    res.sendStatus(200);
});

// Reset button
app.post('/reset', (req, res) => {
    debug(loaded('/reset')); // *** Debug ***
    memory = '0';
    history = [];
    debug(memory); // *** Debug ***
    res.sendStatus(200);
});

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