function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return Math.round((a / b + Number.EPSILON) * 1000) / 1000;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
    default:
      "ERROR";
  }
}

function displayNumber() {
  if (operatorSelected === true) {
    operatorSelected = false;
    storedNumber = Number(displayOut.textContent);
    displayOut.textContent = "";
  }
  if (displayOut.textContent === "0") {
    displayOut.textContent = this.textContent;
    return;
  }
  displayOut.textContent += this.textContent;
}

function operatorSelect() {
  if (operatorSelected) {
    result = operate(
      Number(displayOut.textContent),
      Number(displayOut.textContent),
      storedOperator === "" ? this.textContent : storedOperator
    );
    displayOut.textContent = result;
    operatorSelected = true;
    storedOperator = this.textContent;
    return;
  }
  if (storedNumber === 0) {
    storedOperator = this.textContent;
    operatorSelected = true;
    return;
  }
  result = operate(
    Number(storedNumber),
    Number(displayOut.textContent),
    storedOperator === "" ? this.textContent : storedOperator
  );
  displayOut.textContent = result;
  storedOperator = this.textContent;
  operatorSelected = true;
}

function evaluate() {
  if (operatorSelected) {
    result = operate(
      Number(displayOut.textContent),
      Number(displayOut.textContent),
      storedOperator
    );
    displayOut.textContent = result;
    operatorSelected = false;
    storedOperator = "";
    storedNumber = 0;
    return;
  }
  if (storedOperator === "") return;
  result = operate(
    Number(storedNumber),
    Number(displayOut.textContent),
    storedOperator
  );
  displayOut.textContent = result;
  operatorSelected = false;
  storedOperator = "";
  storedNumber = 0;
}

function clearCalc() {
  let result = 0;
  let storedNumber = 0;
  let operatorSelected = false;
  let storedOperator = "";
  displayOut.textContent = "0";
}

let result = 0;
let storedNumber = 0;
let operatorSelected = false;
let storedOperator = "";

let displayOut = document.querySelector(".displayOut");
const numberBtns = document.querySelectorAll(".numbers > button");
const operators = document.querySelectorAll(".operators > button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

numberBtns.forEach((numberBtn) =>
  numberBtn.addEventListener("click", displayNumber)
);
operators.forEach((operator) =>
  operator.addEventListener("click", operatorSelect)
);

clear.addEventListener("click", clearCalc);
equal.addEventListener("click", evaluate);
