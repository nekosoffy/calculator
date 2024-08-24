function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

let firstNumber;
let operator;
let secondNumber;

function operate() {
    if (operator = "+") {
        add(firstNumber,secondNumber);
    }
    if (operator = "-") {
        subtract(firstNumber,secondNumber);
    }
    if (operator = "*") {
        multiply(firstNumber,secondNumber);
    }
    if (operator = "/") {
        divide(firstNumber,secondNumber);
    }
}