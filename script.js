function add(firstNum, secondNum) {
  return Math.round((firstNum + secondNum + Number.EPSILON) * 100000) / 100000;
}
function subtract(firstNum, secondNum) {
  return Math.round((firstNum - secondNum + Number.EPSILON) * 100000) / 100000;
}
function multiply(firstNum, secondNum) {
  return Math.round((firstNum * secondNum + Number.EPSILON) * 100000) / 100000;
}
function divide(firstNum, secondNum) {
  if (secondNum === 0) return "What da dog doin?";
  return Math.round((firstNum / secondNum + Number.EPSILON) * 100000) / 100000;
}

function operate(operator, firstNum, secondNum) {
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "*":
      return multiply(firstNum, secondNum);
    case "/":
      return divide(firstNum, secondNum);
    default:
      return "ERROR";
  }
}

function operatorSelect(operatorBtn) {
  calculate();
  let selectOp =
    operatorBtn instanceof Object ? operatorBtn.target.innerText : operatorBtn;
  firstNum = Number(display.textContent);
  switch (selectOp) {
    case "+":
      operator = "+";
      break;
    case "-":
      operator = "-";
      break;
    case "x":
      operator = "*";
      break;
    case "%":
      operator = "/";
      break;
    default:
      operator = "ERROR";
  }
}

function calculate(isClicked) {
  if (operator.length == 1) {
    let result = 0;
    if (secondNum != null) {
      secondNum = Number(display.textContent);
      result = operate(operator, firstNum, secondNum);
      secondNum = null;
    } else if (secondNum == null) {
      result = operate(operator, firstNum, firstNum);
    }
    display.textContent = result;
    firstNum = result;
  }

  if (!!isClicked) {
    operator = "";
    firstNum = null;
  }
}

function clear() {
  firstNum = null;
  secondNum = null;
  operator = "";
  display.textContent = "0";
}

function appendDisplay(digitBtn) {
  const digit =
    digitBtn instanceof Object ? digitBtn.target.innerText : digitBtn;
  if (operator.length == 1 && secondNum == null) {
    display.textContent = "0";
    secondNum = 0;
    if (digitBtn === undefined) {
      return;
    }
  }
  if (
    display.textContent == "0" ||
    (!operator.length && firstNum == null && secondNum == null)
  ) {
    if (firstNum == null) firstNum = 0;
    display.textContent = digit;
    return;
  }
  display.textContent = display.textContent + digit;
}

function addDecimalDot() {
  if (operator.length && secondNum == null) {
    appendDisplay();
  }
  if (firstNum == null && secondNum == null && !operator) {
    firstNum = 0;
    display.textContent = "0";
  }
  if (!display.textContent.includes(".")) {
    if (!firstNum == null && !secondNum == null && !operator) {
      display.textContent = 0;
    }
    display.textContent = display.textContent + ".";
  }
}

function backspace() {
  if (operator == "" && firstNum == null) {
    display.textContent = "0";
    return;
  }
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.substring(
      0,
      display.textContent.length - 1
    );
  } else {
    display.textContent = "0";
  }
}

function keyPress(pressedKey) {
  const key = pressedKey.key.toString();
  if (key.match(/[0-9]/g)) {
    appendDisplay(key);
  } else if (key.match(/[\+\-\*\/]/g)) {
    operatorSelect(key);
  } else if (key == "=") {
    calculate(true);
  } else if (key == ".") {
    addDecimalDot();
  } else if (key == "c") {
    clear();
  } else if (key == "Backspace") {
    backspace();
  }
}

let firstNum = null;
let secondNum = null;
let operator = "";
let display = document.querySelector("#display");
const digitsBtn = document.querySelectorAll("#digits > .digit");
const operatorsBtn = document.querySelectorAll("#operators > button");
const calcBtn = document.querySelector("#calculate");
const clearBtn = document.querySelector("#clear");
const dotBtn = document.querySelector("#dot");
const backspaceBtn = document.querySelector("#backspace");

digitsBtn.forEach((digitBtn) =>
  digitBtn.addEventListener("click", appendDisplay)
);
operatorsBtn.forEach((operatorBtn) =>
  operatorBtn.addEventListener("click", operatorSelect)
);
calcBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clear);
dotBtn.addEventListener("click", addDecimalDot);
window.addEventListener("keydown", keyPress);
backspaceBtn.addEventListener("click", backspace);