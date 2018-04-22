/* client.js
This is the main client-side javascript file. Console logs made from within
this file will be outputted to the in-browser console as opposed to the
server-side terminal.
*/

console.log('js'); // Javascript is running

// ==========TOGGLES==========
const DEBUGGING = true;
const BLANK_SCREEN = true;

// ==========Global Variables==========
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
let openFunction = 0;
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
const buttonKeys = [];
for (let key of Object.keys(buttonList)) {
    buttonKeys.push(key);
}

debug(buttonList); // *** Debug ***
debug(buttonKeys); // *** Debug ***

$(document).ready(onReady);

// ==========jQuery function callback==========
function onReady() {
    console.log('JQ'); // jQuery is running

    // Document-ready value loads
    for (let key of buttonKeys) {
        $(`#${key}`).data('name', key);
        $(`#${key}`).data('value', buttonList[key]);
    }
    bigScreen = $('#bigScreen');
    smallScreen = $('#smallScreen');
    operation = $('#operation');

    if (BLANK_SCREEN) {
        bigScreen.val('0');
        smallScreen.val('0');
        operation.val('');
    }

    getHistory();

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
        if (value == 'm') { memoryStore() };

        // Set "Memory-recall" button functionality
        if (value == 'mr') memoryRecall();

        // Set "Memory-clear" button functionality
        if (value == 'mc') memoryClear();

        // Set "y-root" button functionality
        if (value == '√') rootY();

        // Set "y-power" button functionality
        if (value == '^') powerY();

        // Set [operation] button functionality
        if (['×', '÷', '-', '+'].includes(value)) doOperation(button);

        // Set 'Equals' button functionality
        if (value == '=') equals();

        buttonProps(button); // *** Debug ***
    });
    $('#reset').on('click', function () {
        $.ajax({
            method: 'POST',
            url: '/reset',
            data: 'reset'
        }).then(function (response) {
            console.log(response);
            memoryFlash('•');
        });
        getHistory();
        bigScreen.val('0');
        smallScreen.val('0');
        operation.val('');
    });
}

// ==========BUTTON FUNCTIONS==========

// Clear button (FUNCTIONAL)
function clear(button) {
    debug('Clear');
    if (bigScreen.val() !== '0') {
        bigScreen.val('0');
        smallScreen.val(eval(smallScreen.val()));
        openFunction = 0;
        debug('Big screen cleared.'); // *** Debug ***
    } else if (bigScreen.val() == 0) {
        smallScreen.val('0');
        operation.val('');
        debug('Small screen cleared.'); // *** Debug ***
    }
}

// Number buttons (FUNCTIONAL)
function number(button) {
    if (operation.val() == 'X=') {
        smallScreen.val(bigScreen.val());
        operation.val('');
        bigScreen.val('0');
    }
    debug('Number'); // *** Debug ***
    if (bigScreen.val() === '0') {
        bigScreen.val(value);
    } else {
        bigScreen.val(bigScreen.val() + value);
    }
}

// Point button (FUNCTIONAL)
function point() {
    debug('Point'); // *** Debug ***
    if (bigScreen.val() === '0') {
        $(bigScreen).val('0' + value);
    } else {
        $(bigScreen).val(bigScreen.val() + value);
    }
}

// Paren buttons (FUNCTIONAL)
function paren(button) {
    debug('Parentheses'); // *** Debug ***
    if (operation.val() == 'X=') {
        smallScreen.val(bigScreen.val());
        operation.val('');
        bigScreen.val('0');
    }
    if (bigScreen.val() === '0') {
        bigScreen.val(value);
    } else {
        bigScreen.val(bigScreen.val() + value);
    }
    if (value == '(') openFunction++;
    if (value == ')') openFunction--;
}

// Memory-store button (FUNCTIONAL)
function memoryStore() {
    debug('Memory: store'); // *** Debug ***
    $.ajax({
        method: 'POST',
        url: '/memory-store',
        data: bigScreen.val()
    }).then(function (response) {
        console.log(response);
        memoryFlash('M');
    });
}

// Memory-recall button (FUNCTIONAL)
function memoryRecall() {
    debug('Memory: recall'); // *** Debug ***
    $.ajax({
        method: 'GET',
        url: '/memory-recall'
    }).then(function (response) {
        bigScreen.val(response);
        memoryFlash('MR');
    });
}

// Memory-clear button (FUNCTIONAL)
function memoryClear() {
    debug('Memory: clear'); // *** Debug ***
    $.ajax({
        method: 'POST',
        url: '/memory-clear',
        data: 'delete'
    }).then(function (response) {
        console.log(response);
        memoryFlash('MC');
    });
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
    if (openFunction == 0) {
        try {
            if (openFunction == 0) {
                smallScreen.val(bigScreen.val());
                bigScreen.val('0');
                operation.val(value);
            }
        } catch (err) {
            errorFlash();
        }
    } else {
        if (value == '×') value = '*';
        if (value == '÷') value = '/';
        bigScreen.val(bigScreen.val() + value);
    }
}

// Equals button
function equals() {
    debug('Equals');
    let expresssion;
    let operator = operation.val();
    let answer;
    let xValue = smallScreen.val();
    let yValue = bigScreen.val();
    let operatorName;
    debug(operator);
    if (operator == '×') {
        operator = '*';
        operatorName = 'multiply';
    } else if (operator == '÷') {
        operator = '/';
        operatorName = 'divide';
    } else if (operator == '+') {
        operator = '+';
        operatorName = 'add';
    } else if (operator == '-') {
        operator = '-';
        operatorName = 'subtract'
    }
    expression = {
        x: xValue,
        y: yValue,
        type: operator
    }
    setExpressionModule(expression);
    debug(expression);
    
    getHistory();
}

// ----------Support Functions----------

// Set 'expression' module value
function setExpressionModule(expression) {
    debug(expression); // *** Debug ***
    $.ajax({
        method: 'POST',
        url: '/set-expression',
        data: expression
    }).then(function (response) {
        console.log(response);
    });
}

// Set 'answer' module value
function setAnswerModule(answer) {
    debug(expression); // *** Debug ***
    $.ajax({
        method: 'POST',
        url: '/set-answer',
        data: answer
    }).then(function (response) {
        console.log(response);
    });
}

// Set 'formula' module value
function setFormulaModule(formula) {
    debug(formula); // *** Debug ***
    $.ajax({
        method: 'POST',
        url: '/set-formula',
        data: formula
    }).then(function (response) {
        console.log(response);
    });
}

// Get 'expression' module value
function getExpressionModule() {
    let expression;
    $.ajax({
        method: 'GET',
        url: '/get-expression'
    }).then(function (response) {
        debug(response);
        expression = response;
    });
    return expression;
}

// Get 'answer' module value
function getAnswerModule() {
    let answer;
    $.ajax({
        method: 'GET',
        url: '/get-answer'
    }).then(function (response) {
        debug(response);
        answer = response;
    });
    return answer;
}

// Memory operation flash
function memoryFlash(show) {
    let temp = operation.val();
    operation.val(show);
    setTimeout(function () { operation.val(temp); }, 200);
}

// Flash 'ERROR' message
function errorFlash() {
    let temp = bigScreen.val();
    bigScreen.val('ERROR');
    setTimeout(function () { bigScreen.val(temp); }, 200);
}

// Retrieve history
function getHistory() {
    let history = $('#historyEntries');
    history.html('');
    $.ajax({
        method: 'GET',
        url: '/history-list'
    }).then(function (response) {
        for (let item of response) {
            let xValue = item.x;
            let yValue = item.y;
            let type = item.type;
            history.append(`<tr><td>${xValue}</td><td>${yValue}</td><td>${type}</td></tr>`);
        }
    });
}

// Add a calculation to the history
function addToHistory(item) {
    $.ajax({
        method: 'POST',
        url: '/history-add',
        data: item
    }).then(function (response) {
        console.log(response);
    });
}

// Get the current expression
function getCurrent() {
    $.ajax({
        method: 'GET',
        url: '/get-current',
    }).then(function (response) {
        // PLACEHOLDER
    });
}

// ==========Miscellaneous debugging tools==========

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