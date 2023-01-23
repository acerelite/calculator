function add(a, b) {
  return Math.round((a + b + Number.EPSILON) * 100000) / 100000;
}
function subtract(a, b) {
  return Math.round((a - b + Number.EPSILON) * 100000) / 100000;
}
function multiply(a, b) {
  return Math.round((a * b + Number.EPSILON) * 100000) / 100000;
}
function divide(a, b) {
  return Math.round((a / b + Number.EPSILON) * 100000) / 100000;
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

function checkKeybPress(e, numBtn) {
  if (typeof e === "string") {

    return `${e}`;
  }
  return numBtn.textContent;
}

function completeNumber(equation) {
  let tempArr = equation.join("").split(operatorSymbols);
  if (tempArr.at(-1) === "") {
    tempArr.pop();
    tempArr.push("0");
  }
  for (let unit of equation) {
    if (unit.toString().match(operatorSymbols)) {
      tempArr.push(unit.toString());
      break;
    }
  }
  return tempArr;
}

function displayNumber(e) {
  let textContent = checkKeybPress(e, this);

  if (equation.at(-1) === "=") {
    equation = [];
    displayOut.textContent = "0";
  }
  if (displayOut.textContent === "0" || operatorSymbols.test(equation.at(-1))) {
    equation.push(Number(textContent));
    displayOut.textContent = textContent;
    return;
  }
  equation.push(Number(textContent));
  displayOut.textContent += textContent;
}

function operatorSelect(e) {
  let textContent = checkKeybPress(e, this);
  let result = 0;
  equation.at(-1) === "=" ? equation.pop() : "";

  if (equation.at(-1).toString().match(operatorSymbols)) {
    let numFromEquation = Number(
      equation.slice(0, equation.length - 1).join("")
    );
    result = operate(numFromEquation, numFromEquation, equation.at(-1));
    equation = [];
    equation.push(result);
    equation.push(textContent);
    displayOut.textContent = result;
    return;
  }
  if (equation.join("").split(operatorSymbols).length === 2) {
    let seperate = completeNumber(equation);
    result = operate(Number(seperate[0]), Number(seperate[1]), seperate[2]);
    equation = [];
    equation.push(result);
    displayOut.textContent = result;
  }
  equation.push(textContent);
}

function clearCalc() {
  equation = [];
  equation[0] = 0;
  displayOut.textContent = "0";
}

function addDecPoint() {
  if (equation.at(-1) === "=") {
    equation = [];
    displayOut.textContent = "0.";
    equation.push("0.");
    return;
  }
  if (operatorSymbols.test(equation.at(-1))) {
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
  if (equation.at(-1) === "=") {
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
  if (operatorSymbols.test(equation.at(-1))) {
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
  if (equation.at(-1).toString().match(operatorSymbols)) {
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
  if (equation.join("").split(operatorSymbols).length === 2) {
    let seperate = completeNumber(equation);
    result = operate(Number(seperate[0]), Number(seperate[1]), seperate[2]);
    displayOut.textContent = result;
    equation = [];
    equation.push(result);
    equation.push("=");
  }
}

const operatorSymbols = /[\-\/\+\*]/;
const num = /^\d+$/;
let equation = [];
equation.push(0);
let displayOut = document.querySelector(".displayOut");
const numberBtns = document.querySelectorAll(".numbers > button");

console.log(numberBtns);
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
del.addEventListener("click", backspace);

window.addEventListener("keydown", function (e) {

  console.log(e.key);
  if (operatorSymbols.test(e.key)) {
    operatorSelect(e.key);
  } else if (num.test(e.key)) {
    displayNumber(e.key);
  } else if (e.key === "=") {
    calculate();
  } else if (e.key === ".") {
    addDecPoint();
  } else if (e.key === "Backspace"){
    backspace();
  }
});
