/* client.js
This is the main client-side javascript file. Console logs made from within
this file will be outputted to the in-browser console as opposed to the
server-side terminal.
*/

// =====DEBUGGING TOGGLE=====
const DEBUGGING = true;

// Important Values
let working = '0';
let current = '0';
let workingLength = 0;
let currentLength = 0;
let name = '';
let value = '';
let button;
let bigScreen;
let smallScreen;
let operation;
let openParantheses = 0;

console.log('js');

$(document).ready(onReady);

// Create a list of the button names and values
const buttonList = {
    clear: 'c',
    memoryStore: 'm',
    memoryRecall: 'mr',
    memoryClear: 'mc',
    root: '√',
    power: '^',
    parenClose: ')',
    parenOpen: '(',
    multiply: '×',
    divide: '÷',
    minus: '-',
    plus: '+',
    equals: '=',
    point: '.',
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

// 
const buttonKeys = [];
for (let key of Object.keys(buttonList)) {
    buttonKeys.push(key);
}

debug(buttonList); // Debug
debug(buttonKeys); // Debug

function onReady() {
    console.log('JQ');

    // ----------First-load value loads----------
    for (let key of buttonKeys) {
        $(`#${key}`).data('name', key);
        $(`#${key}`).data('value', buttonList[key]);
    }
    bigScreen = $('#bigScreen');
    bigScreen.val('0');
    smallScreen = $('#smallScreen');
    smallScreen.val('0');
    operation = $('#operation');

    // ==========Button event handlers==========
    $('.btn').on('click', function () {

        // Apply variable shortcuts for often-used jquery objects    
        button = $(this);
        name = button.data('name');
        value = button.data('value');

        // Set 'Clear' button functionality
        if (value == 'c') clear(button);

        // Set [0-9] button functionality
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)) number(button);

        // Set '.' button functionality
        if (value == '.') point();

        // Set '(' and ')' button functionality
        if (value == '(' || value == ')') paren(button);

        // Set "Memory-store" button functionality
        if (value == 'm') memoryStore();

        // Set "Memory-recall" button functionality
        if (value == 'mr') memoryRecall();

        // Set "Memory-clear" button functionality
        if (value == 'mc') memoryClear();

        // Set "y-root" button functionality
        if (value == '√') rootY();

        // Set "y-power" button functionality
        if (value == '^') powerY();

        // Set [operation] button functionality
        if (['×', '÷','-','+'].includes(value)) doOperation(button);

        // Set 'Equals' button functionality
        if (value == '=') equals();

        buttonProps(button); // *** Debug ***
    });
}

// ==========BUTTON FUNCTIONS==========

// Clear button
function clear(button) {
    debug('Clear');
    if (bigScreen.val() !== '0') {
        bigScreen.val('0');
        existingPoint = false;
        debug('Big screen cleared.'); // *** Debug ***
    } else if (bigScreen.val() == 0) {
        smallScreen.val('0');
        operation.val('');
        existingPoint = false;
        debug('Small screen cleared.'); // *** Debug ***
    }
}

// Number buttons
function number(button) {
    debug('Number');
    if (bigScreen.val() === '0') {
        bigScreen.val(value);
    }
    else {
        bigScreen.val(bigScreen.val() + value);
    }
}

// Point button
function point() {
    debug('Point');
    if (bigScreen.val() === '0') {
        $(bigScreen).val('0' + value);
    } else {
        $(bigScreen).val(bigScreen.val() + value);
    }
}

// Paren buttons
function paren(button) {
    debug('Parentheses'); // *** Debug ***
}

// Memory-store button
function memoryStore() {
    debug('Memory: store'); // *** Debug ***
}

// Memory-recall button
function memoryRecall() {
    debug('Memory: recall'); // *** Debug ***
}

// Memory-clear button
function memoryClear() {
    debug('Memory: clear'); // *** Debug ***
}

// Root button
function rootY() {
    debug('Root'); // *** Debug ***
}

// Power button
function powerY() {
    debug('Power'); // *** Debug ***
}

// Operation buttons
function doOperation(button) {
    debug('Operation'); // *** Debug ***
}

// Equals button
function equals() {
    debug('Equals');
}

// ----------Miscellaneous debugging tools.----------

function buttonProps(button) {
    if (DEBUGGING) {
        button = $(this);
        buttonName = button.data('name');
        buttonValue = button.data('value');
        console.log(`Name: ${name}; Value: ${value}; Big screen: ${bigScreen.val()}; Small screen: ${smallScreen.val()}`); // Debug
    }
}

function debug(item) {
    if (DEBUGGING) {
        console.log(item);
    }
}