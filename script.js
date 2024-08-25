let firstNumber;
let operator;
let operatorPicked;
let secondNumber;
let secondNumberPicked;
let cleaned;

function initialState() {
display.textContent = "0";
firstNumber = 0;
operator = "";
operatorPicked = false;
secondNumber = null;
secondNumberPicked = false;
cleaned = false;
}

const clearButton = document.querySelector(".clear");
const clear = clearButton.addEventListener("click", initialState);

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
    if (b === 0) {
        alert("Cannot divide by zero!");
        return 0;
    }
    return a / b;
}

function operate() {
    let result;
    if (operator == "+") {
        result = (add(firstNumber,secondNumber));
    } else if (operator == "-") {
        result = (subtract(firstNumber,secondNumber));
    } else if (operator == "∗") {
        result = (multiply(firstNumber,secondNumber));
    } else if (operator == "÷") {
        result = (divide(firstNumber,secondNumber));
    }
    return result;
}

const display = document.querySelector(".display");

function numberDisplay() {
    const digitButtons = document.querySelectorAll(".digits button");
    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
        if (display.textContent == "0" || afterResult) {
            display.textContent = "";
            afterResult = false;
        } else if (operator != "" && !cleaned) {
            display.textContent = "";
            cleaned = true;
        }
        display.textContent += button.textContent;
        getNumbers();
    });
});
}

function getNumbers() {
    if (operator == "") {
        firstNumber = Number(display.textContent);
    } else {
        secondNumber = Number(display.textContent);
        secondNumberPicked = true;
    }
}

function result() {
    if (secondNumberPicked == true) {
        afterResult = true;
        firstNumber = operate();
        display.textContent = firstNumber;
        secondNumberPicked = false;
        cleaned = false;
        operator = "";
    };
}

const equalButton = document.querySelector(".equal");
const showResult = equalButton.addEventListener("click", result);

function pickOperator() {
    const operatorButtons = document.querySelectorAll(".symbols button");
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if ((button.textContent != ",") && 
            (button.textContent != "=") && 
            (secondNumberPicked == false)) {
                operator = button.textContent;
                operatorPicked = true;
            }
            if ((secondNumberPicked == true) && 
            (operatorPicked == true) && 
            (button.textContent != ",") && 
            (button.textContent != "=")) {
                result();
                operator = button.textContent;
            }
    });
});
}

function backspace() {
    const backspace = document.querySelector(".backspace");
    backspace.addEventListener("click", () => {
        if (display.textContent != "0") {
            if ((display.textContent).length == 1) {
                display.textContent = "0";
            } else {
                let erasedDisplay;
                erasedDisplay = (display.textContent).slice(0,-1);
                display.textContent = erasedDisplay;
            }
        }
        getNumbers();
    });
}

initialState();
numberDisplay();
pickOperator();
backspace();