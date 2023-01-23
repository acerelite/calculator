function add(a, b) {
  return Math.round((a + b + Number.EPSILON) * 10000000) / 10000000;
}
function subtract(a, b) {
  return Math.round((a - b + Number.EPSILON) * 10000000) / 10000000;
}
function multiply(a, b) {
  return Math.round((a * b + Number.EPSILON) * 10000000) / 10000000;
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
      return b === 0 ? "What ya doin" : divide(a, b);
    default:
      "ERROR";
  }
}

function displayNumber() {
  if(equation.at(-1) === "=") {
    equation = [];
    displayOut.textContent = "0"
  }
  if (displayOut.textContent === "0" || regex.test(equation.at(-1))) {
    equation.push(Number(this.textContent));
    displayOut.textContent = this.textContent;
    return;
  }
  equation.push(Number(this.textContent));
  displayOut.textContent += this.textContent;
}

function completeNumber(equation) {
  let tempArr = equation.join("").split(regex);
  if (tempArr.at(-1) === "") {
    tempArr.pop();
    tempArr.push("0");
  }
  for (let unit of equation) {
    if (unit.toString().match(regex)) {
      tempArr.push(unit.toString());
      break;
    }
  }
  return tempArr;
}

function operatorSelect() {
  equation.at(-1) === "=" ? equation.pop(): "";
  let result = 0;
  if (equation.at(-1).toString().match(regex)) {
    let numFromEquation = Number(
      equation.slice(0, equation.length - 1).join("")
    );
    result = operate(numFromEquation, numFromEquation, equation.at(-1));
    equation = [];
    equation.push(result);
    equation.push(this.textContent);
    displayOut.textContent = result;
    return;
  }
  if (equation.join("").split(regex).length === 2) {
    let seperate = completeNumber(equation);
    result = operate(Number(seperate[0]), Number(seperate[1]), seperate[2]);
    equation = [];
    equation.push(result);
    displayOut.textContent = result;
  }
  equation.push(this.textContent);
}

function clearCalc() {
  equation = [];
  equation[0] = 0;
  displayOut.textContent = "0";
}

function addDecPoint() {
  if(equation.at(-1) === "=") {
    equation = [];
    displayOut.textContent = "0.";
    equation.push("0.");
    return;
  }
  if (regex.test(equation.at(-1))) {
    displayOut.textContent = "0.";
    equation.push(".");
    return;
  }
  if (displayOut.textContent.includes(".")) {
    return;
  }
  displayOut.textContent += ".";
  equation.push(".");
}

function backspace() {
  if(equation.at(-1) === "=") {
    equation = [];
    equation.push[0];
    displayOut.textContent = "0";
    equation.push("0");
    return;
  }
  if (displayOut.textContent === "0" || displayOut.textContent.length == 1) {
    displayOut.textContent = "0";
    equation.pop();
    return;
  }
  if (regex.test(equation.at(-1))) {
    equation.pop();
  }
  displayOut.textContent = displayOut.textContent.substring(
    0,
    displayOut.textContent.length - 1
  );
  equation.pop();
}

function calculate() {
  let result = 0;
  if(equation.at(-1).toString().match(regex)){
    let numFromEquation = Number(
      equation.slice(0, equation.length - 1).join("")
    );
    console.log(numFromEquation);
    result = operate(numFromEquation, numFromEquation, equation.at(-1));
    equation = [];
    equation.push(result);
    equation.push("=");
    displayOut.textContent = result;
    return;
  }
  if (equation.join("").split(regex).length === 2) {
    let seperate = completeNumber(equation);
    result = operate(Number(seperate[0]), Number(seperate[1]), seperate[2]);
    displayOut.textContent = result;
    equation = [];
    equation.push(result);
    equation.push("=");
  }
}

const regex = /[\-\/\+\*]/;
let equation = [];
equation.push(0);
let displayOut = document.querySelector(".displayOut");
const numberBtns = document.querySelectorAll(".numbers > button");
const operators = document.querySelectorAll(".operators > button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const dot = document.querySelector(".dot");
const del = document.querySelector(".del");

numberBtns.forEach((numberBtn) =>
  numberBtn.addEventListener("click", displayNumber)
);
operators.forEach((operator) =>
  operator.addEventListener("click", operatorSelect)
);
clear.addEventListener("click", clearCalc);
dot.addEventListener("click", addDecPoint);
equal.addEventListener("click", calculate);
