let firstNumber = 0;           // Stores the first number in the calculation
let operator = null;           // Stores the current operator
let operatorPicked = false;    // Indicates if an operator has been selected
let secondNumber = null;       // Stores the second number in the calculation
let cleaned = false;           // Indicates if the display was cleared for a new number
let afterPoint = false;        // Indicates if a decimal point has been added
let afterResult = false;       // Indicates if the result of a calculation is displayed 

const display = document.querySelector(".display");
const backspace = document.querySelector(".backspace");
const clear = document.querySelector(".clear");
const numbers = document.querySelectorAll(".num_wrapper button");
const operators = document.querySelectorAll(".symbol");
const separator = document.querySelector(".point");
const equality = document.querySelector(".equal");

const updateDisplay = (value) => {
    display.textContent = value;
};

const eraseLastChar = () => {
    updateDisplay(display.textContent.slice(0, -1));
};

function resetState() {
    updateDisplay("0");
    firstNumber = 0;
    operator = null;
    operatorPicked = false;
    secondNumber = null;
    cleaned = false;
    afterPoint = false;
    afterResult = false;
}

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "∗": (a, b) => a * b,
    "÷": (a, b) => b === 0 ? (alert("Cannot divide by zero!"), 0) : a / b
};

function operate() {
    return operator in operations ? operations[operator](firstNumber, secondNumber) : null;
}

function result() {
    if (secondNumber !== null) {
        afterResult = true;
        firstNumber = operate();
        updateDisplay(String(firstNumber));
        secondNumber = null;
        cleaned = false;
        operator = null;
    };
}

function handleOperatorClick(event) {
    const button = event.target;
    if ((afterPoint) && (display.textContent.at(-1) === ".")) { // Removes the decimal point after pressing an operator, if it exists.
        eraseLastChar();
    }
    if (secondNumber === null) {
        operator = button.textContent;
        operatorPicked = true;
        afterResult = false;
    }
    if ((secondNumber !== null) && (operatorPicked)) { // If you press an operator before the equal sign, but after picking the second number, 
        result();                                      // this controls that the result will be shown. It also uses the result of the previous 
        operator = button.textContent;                 // operation as the first number of a new operation, along with the operator pressed.
        afterResult = false;
    }
}

function updateNumbers() {                           
    if (operator === null) {
        firstNumber = Number(display.textContent);
    } else {
        secondNumber = Number(display.textContent);
    }
}

function handleNumberClick(event) {
    const button = event.target;
    if (display.textContent === "0" || afterResult) {
        updateDisplay("");
    } else if (operator !== null && !cleaned && secondNumber === null) { // This clears the display before showing the second number of the operation.
        updateDisplay("");
        cleaned = true;
    }
    afterResult = false;
    afterPoint = false;
    if ((display.textContent).length < 16) {
        updateDisplay(display.textContent + button.textContent);
    }
    updateNumbers();
}

function handleBackspaceClick() {
    if (display.textContent != "0") {
        if ((display.textContent).length == 1) {
            updateDisplay("0");
        } else if (afterResult) {
            updateDisplay("0");
            afterResult = false;                
        } else {
            eraseLastChar();
        }
    }
    updateNumbers();
}

function handleSeparatorClick() {
    if ((!display.textContent.includes(".")) && (!afterPoint)) {
        if (display.textContent === "0" || afterResult) { // Correct display when pressing . after zero or right after the result of an operation.
            updateDisplay("0.");
        } else if ((operatorPicked) && (secondNumber === null)) { // Correct display for pressing "." right after an operator.
            updateDisplay("0.");
            cleaned = true;
        } else {
            updateDisplay(display.textContent + ".");
        }
        afterPoint = true;
        afterResult = false;
    } else if ((display.textContent === "0") || (afterResult)) { // Included for the case where the result already has a "."
        updateDisplay("0.");
        afterPoint = true;
        afterResult = false;
    }
    updateNumbers();
}

function handleKeyPress(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        handleNumberClick({ target: { textContent: key } });
    } else if (key === '+') {
        handleOperatorClick({ target: { textContent: '+' } });
    } else if (key === '-') { 
        handleOperatorClick({ target: { textContent: '-' } });
    } else if (key === '*') {
        handleOperatorClick({ target: { textContent: '∗' } });
    } else if (key === '/') {
        handleOperatorClick({ target: { textContent: '÷' } });
    } else if (key === 'Enter' || key === '=') {
        result();
    } else if (key === 'Backspace') {
        handleBackspaceClick();
    } else if (key === '.') {
        handleSeparatorClick();
    } else if (key === 'Escape') {
        resetState();
    }
}

backspace.addEventListener("click", handleBackspaceClick);
clear.addEventListener("click", resetState);
separator.addEventListener("click", handleSeparatorClick);
equality.addEventListener("click", result);

numbers.forEach(button => button.addEventListener("click", handleNumberClick));
operators.forEach(button => button.addEventListener("click", handleOperatorClick));

window.addEventListener("keydown", handleKeyPress);