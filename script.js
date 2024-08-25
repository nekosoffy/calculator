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

let firstNumber = 0;
let operator = "";
let operatorPicked = false;
let secondNumber;
let secondNumberPicked = false;
let cleaned = false;
const display = document.querySelector(".display");

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

function numberDisplay() {
    const digitButtons = document.querySelectorAll(".digits button");
    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
        if (display.textContent == "0") {
            display.textContent = "";
        } else if (operator != "" && cleaned == false) {
            display.textContent = "";
            cleaned = true;
        }
        display.textContent += button.textContent;
        getNumbers();
    });
});
}

function pickOperator() {
    const operatorButtons = document.querySelectorAll(".symbols button");
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if ((button.textContent != ",") && (button.textContent != "=")) {
                operator = button.textContent;
                operatorPicked = true;

                if ((secondNumberPicked == true) && (operatorPicked == true)) {
                    firstNumber = operate();
                    display.textContent = firstNumber;
                    secondNumberPicked = false;
                    operator = button.textContent;
                    cleaned = false;
                }
            }
        console.log(operator);
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

numberDisplay();
pickOperator();