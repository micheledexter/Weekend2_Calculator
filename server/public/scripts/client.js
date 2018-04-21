/* client.js
This is the main client-side javascript file. Console logs made from within
this file will be outputted to the in-browser console as opposed to the
server-side terminal.
*/
console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#clear').on('click', clear);
    $('#memoryStore').on('click', memoryStore);
    $('#memoryRecall').on('click', memoryRecall);
    $('#memoryClear').on('click', memoryClear);
    $('#root').on('click', root);
    $('#power').on('click', power);
    $('#parenClose').on('click', parenClose);
    $('#parenOpen').on('click', parenOpen);
    $('#multiply').on('click', multiply);
    $('#divide').on('click', divide);
    $('#minus').on('click', minus);
    $('#plus').on('click', plus);
    $('#equals').on('click', equals);
    $('#point').on('click', point);
    $('#zero').on('click', zero);
    $('#one').on('click', one);
    $('#two').on('click', two);
    $('#three').on('click', three);
    $('#four').on('click', four);
    $('#five').on('click', five);
    $('#six').on('click', six);
    $('#seven').on('click', seven);
    $('#eight').on('click', eight);
    $('#nine').on('click', nine);
}

function clear() {
    logPressed('clear');
}

function memoryStore() {
    logPressed('memoryStore');
}

function memoryRecall() {
    logPressed('memoryRecall');
}

function memoryClear() {
    logPressed('memoryClear');
}

function root() {
    logPressed('root');
}

function power() {
    logPressed('power');
}

function parenClose() {
    logPressed('parenClose');
}

function parenOpen() {
    logPressed('parenOpen');
}

function multiply() {
    logPressed('multiply');
}

function divide() {
    logPressed('divide');
}

function minus() {
    logPressed('minus');
}

function plus() {
    logPressed('plus');
}

function equals() {
    logPressed('equals');
}

function point() {
    logPressed('point');
}

function zero() {
    logPressed('zero');
}

function one() {
    logPressed('one');
}

function two() {
    logPressed('two');
}

function three() {
    logPressed('three');
}

function four() {
    logPressed('four');
}

function five() {
    logPressed('five');
}

function six() {
    logPressed('six');
}

function seven() {
    logPressed('seven');
}

function eight() {
    logPressed('eight');
}

function nine() {
    logPressed('nine');
}

function pressed(button) {
    let message = 'Button pressed';
    if (button) message += `: ${button}`;
    return message;
}

function logPressed(button) {
    console.log(pressed(button));
}