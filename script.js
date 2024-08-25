let firstNumber = 0;
let operator = "";
let secondNumber = null;
let cleaned = false;

const display = document.querySelector(".display");

function reset() {
display.textContent = "0";
firstNumber = 0;
operator = "";
secondNumber = null;
cleaned = false;
}

const clearButton = document.querySelector(".clear");
const clear = clearButton.addEventListener("click", reset);

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
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "∗":
            return multiply(firstNumber, secondNumber);
        case "÷":
            return divide(firstNumber, secondNumber);
        default:
            return null;
    }
}

function numberDisplay() {
    const digitButtons = document.querySelectorAll(".digits button");
    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
        if (display.textContent === "0" || afterResult) {
            display.textContent = "";
        } else if (operator !== "" && !cleaned) {
            display.textContent = "";
            cleaned = true;
        }
        afterResult = false;
        display.textContent += button.textContent;
        getNumbers();
    });
});
}

function getNumbers() {
    if (operator === "") {
        firstNumber = Number(display.textContent);
    } else {
        secondNumber = Number(display.textContent);
    }
}

function result() {
    if (secondNumber !== null) {
        afterResult = true;
        firstNumber = operate();
        display.textContent = firstNumber;
        secondNumber = null;
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
            (secondNumber === null)) {
                operator = button.textContent;
                operatorPicked = true;
                afterResult = false;
            }
            if ((secondNumber !== null) && 
            (operatorPicked == true) && 
            (button.textContent != ",") && 
            (button.textContent != "=")) {
                result();
                operator = button.textContent;
                afterResult = false;
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

numberDisplay();
pickOperator();
backspace();