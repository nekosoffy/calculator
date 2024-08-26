let firstNumber = 0;
let operator = "";
let operatorPicked = false;
let secondNumber = null;
let cleaned = false;
let afterResult = false;
let afterPoint = false;

const display = document.querySelector(".display");
const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = 0;
    operator = "";
    operatorPicked = false;
    secondNumber = null;
    cleaned = false;
    afterResult = false;
    afterPoint = false;
});

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
    const digitButtons = document.querySelectorAll(".num_wrapper button");
    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
        if (display.textContent === "0" || afterResult) {
            display.textContent = "";
        } else if (operator !== "" && !cleaned) {
            display.textContent = "";
            cleaned = true;
        }
        afterResult = false;
        afterPoint = false;
        if ((display.textContent).length < 16) {
        display.textContent += button.textContent;
        getNumbers();
        }
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

const equalTo = document.querySelector(".equal");
equalTo.addEventListener("click", result);

function pickOperator() {
    const operatorButtons = document.querySelectorAll(".symbol");
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if ((afterPoint) && (display.textContent.at(-1) === ".")) {
                eraseChar();
            }
            if (secondNumber === null) {
                operator = button.textContent;
                operatorPicked = true;
                afterResult = false;
            }
            if ((secondNumber !== null) && (operatorPicked)) {
                result();
                operator = button.textContent;
                afterResult = false;
            }
    });
});
}

function eraseChar() {
    display.textContent = (display.textContent).slice(0,-1);
}

function backspace() {
    const backspace = document.querySelector(".backspace");
    backspace.addEventListener("click", () => {
        if (display.textContent != "0") {
            if ((display.textContent).length == 1) {
                display.textContent = "0";
            } else if (afterResult) {
                display.textContent = "0";
                afterResult = false;                
            } else {
                eraseChar();
            }
        }
        getNumbers();
    });
}

function addSeparator() {
    if ((!display.textContent.includes(".")) && (!afterPoint)) {
        if (display.textContent === "0" || afterResult) {
            display.textContent = "0.";
        } else if ((operatorPicked) && (secondNumber === null)) {
            display.textContent = "0.";
            cleaned = true;
        } else {
            display.textContent += ".";
        }
        afterPoint = true;
        afterResult = false;
    } else if ((display.textContent === "0") || (afterResult)) {
        display.textContent = "0.";
        afterPoint = true;
        afterResult = false;
    }
    getNumbers();
}

const separator = document.querySelector(".point");
separator.addEventListener("click", addSeparator);

numberDisplay();
pickOperator();
backspace();