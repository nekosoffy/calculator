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
let operator = "";
let operatorPicked = false;
let secondNumber;
let firstNumberPicked = false;
let secondNumberPicked = false;
let cleaned = false;
const display = document.querySelector(".display");

function operate() {
    let result;
    if (operator = "+") {
        return result = add(firstNumber,secondNumber);
    }
    if (operator = "-") {
        return result = subtract(firstNumber,secondNumber);
    }
    if (operator = "∗") {
        return result = multiply(firstNumber,secondNumber);
    }
    if (operator = "÷") {
        return result = divide(firstNumber,secondNumber);
    }
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
            if ((button.textContent != ",") || (button.textContent != "")) {
                firstNumberPicked = true;
                operator = button.textContent;
                operatorPicked = true;
            }
            if ((secondNumberPicked == true) && (operatorPicked == true)) {
                firstNumber = operate();
                display.textContent = firstNumber;
                secondNumberPicked = false;
                operator = button.textContent;
            }
        console.log(operator);
    });
});
}