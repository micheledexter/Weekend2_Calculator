/* server.js
This is the script for the express server that runs. All console logs will end
up in the terminal in which it was instantiated.

Dependencies:
- jquery
- express
- body-parser
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// This is where GET and POST handlers will be

// The app listener goes at the bottom... I think
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));