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
  return Math.round((a / b + Number.EPSILON) * 10000000) / 10000000;
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
      return b === 0 ? "What ya doin": divide(a, b);
    default:
      "ERROR";
  }
}

function displayNumber() {

  if (displayOut.textContent === "0" && operatorSelected === true) {
    displayOut.textContent = this.textContent;
    return;
  }
  if (operatorSelected === true) {
    if(storedNumber === 0) {
      displayOut.textContent += this.textContent;
      return;
    }
    operatorSelected = false;
    storedNumber = Number(displayOut.textContent);
    displayOut.textContent = "";
    displayOut.textContent += this.textContent;
    return;
  }
  if (displayOut.textContent === "0") {
    displayOut.textContent = this.textContent;
    return;
  }
  if(operatorSelected === false) {
    if(operatorSelected === false && equalAccessed == true) {
      equalAccessed = false;
      displayOut.textContent = "";
    }
    displayOut.textContent += this.textContent;
    return;
  }

  displayOut.textContent += this.textContent;
}

function operatorSelect() {
  if (operatorSelected) {
    displayOut.textContent = operate(
      storedNumber === 0 ? 0 : Number(displayOut.textContent),
      Number(displayOut.textContent),
      storedOperator === "" ? this.textContent : storedOperator
    );
    storedNumber = Number(displayOut.textContent);
    storedOperator = this.textContent;
    operatorSelected = true;
    return;
  } else if (storedNumber === 0) {
    storedNumber = Number(displayOut.textContent);
    storedOperator = this.textContent;
    operatorSelected = true;
    return;
  }

  displayOut.textContent = operate(
    Number(storedNumber),
    Number(displayOut.textContent),
    storedOperator === "" ? this.textContent : storedOperator
  );
  storedOperator = this.textContent;
  operatorSelected = true;
}

function evaluate() {
  if (operatorSelected) {
    displayOut.textContent = operate(
      storedNumber === 0 ? 0 : Number(displayOut.textContent),
      Number(displayOut.textContent),
      storedOperator
    );
    storedNumber = 0;
    storedOperator = "";
    operatorSelected = false;
    equalAccessed = true;
    return;
  }else if (storedOperator === "") return;

  displayOut.textContent = operate(
    Number(storedNumber),
    Number(displayOut.textContent),
    storedOperator
  );

  
  storedNumber = 0;
  storedOperator = "";
  operatorSelected = false;
  equalAccessed = true;
}

function clearCalc() {
  let storedNumber = 0;
  displayOut.textContent = "0";
  let storedOperator = "";
  let operatorSelected = false;
}

function addDecPoint() {
  if(displayOut.textContent.includes(".")) return;
  if(operatorSelected) {
    operatorSelected = false;
    displayOut.textContent = "0"
    displayOut.textContent += ".";
    return
  }

  displayOut.textContent += ".";
}

let equalAccessed = false;
let storedNumber = 0;
let operatorSelected = false;
let storedOperator = "";

let displayOut = document.querySelector(".displayOut");
const numberBtns = document.querySelectorAll(".numbers > button");
const operators = document.querySelectorAll(".operators > button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const dot = document.querySelector(".dot");

numberBtns.forEach((numberBtn) =>
  numberBtn.addEventListener("click", displayNumber)
);
operators.forEach((operator) =>
  operator.addEventListener("click", operatorSelect)
);

clear.addEventListener("click", clearCalc);
equal.addEventListener("click", evaluate);
dot.addEventListener("click", addDecPoint);
