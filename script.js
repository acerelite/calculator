
let firstNum;
let secondNum;
let operator;
let equalFlag;
let display;

initCalc();

function initCalc() {
  firstNum = null;
  secondNum = null;
  operator = null;
  equalFlag = false
  display = document.querySelector('.display');
  let numBtns = document.querySelectorAll('.number');
  let opsBtn = document.querySelectorAll('.operator');
  let dotBtn = document.querySelector('.dot');
  let equalBtn = document.querySelector('.equal');
  let clearBtn = document.querySelector('.clear');
  let delBtn = document.querySelector('.del');

  document.addEventListener('keydown', keyboardPress);
  numBtns.forEach(numBtn => { numBtn.addEventListener('click', numPress) });
  opsBtn.forEach(opBtn => { opBtn.addEventListener('click', opPress) });
  dotBtn.addEventListener('click', setDot);
  equalBtn.addEventListener('click', evaluate);
  clearBtn.addEventListener('click', clear);
  delBtn.addEventListener('click', deleteDisplay);
}

function keyboardPress(event) {
  if (event.key == 'Backspace') {
    deleteDisplay();
  } else if (event.key == '.') {
    setDot();
  } else if (event.key.match(/[0-9]/)) {
    numPress(event.key);
  } else if (event.key.match(/([\/\*\-\+])/)) {
    opPress(event.key);
  } else if (event.key == 'Enter') {
    evaluate();
  }
}

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
  if (secondNum == 0) {
    return 'bro';
  }
  return Math.round((firstNum / secondNum + Number.EPSILON) * 100000) / 100000;
}

function operate(firstNum, secondNum, operator) {
  switch (operator) {
    case '+':
      return add(firstNum, secondNum);
    case '-':
      return subtract(firstNum, secondNum);
    case '*':
      return multiply(firstNum, secondNum);
    case '/':
      return divide(firstNum, secondNum);
    default:
      break;
  }
}

function numPress(key) {
  // Assign if keyboard is pressed or button is pressed
  let numPressed = Number(key.target == undefined ? key : key.target.textContent);

  // Start with second operand if operator and first number has bin selected
  if (operator && firstNum != null && secondNum == null) {
    display.textContent = '0';
    secondNum = 0;
  }

  if (display.textContent == '0') {
    display.textContent = numPressed;
  } else {
    display.textContent += numPressed;
  }
}

function opPress(key) {
  // To store the displayed number after pressing an operation
  if (firstNum != null) {
    secondNum = Number(display.textContent);
  } else {
    firstNum = Number(display.textContent);
  }

  // To check whether an operator is present to start computing
  if (operator) {
    let result = 0;
    result = operate(firstNum, secondNum, operator);
    firstNum = result;
    secondNum = null;
    display.textContent = result;
  }

  // Assign if keyboard is pressed or button is pressed
  operator = key.target == undefined ? key : key.target.textContent;

}

function setDot() {
  // Reset display when starting on second operand
  if (firstNum != null && secondNum == null) {
    display.textContent = '0'
    secondNum = 0;
  }

  // if(firstNum != null && operator) display.textContent = '0';
  if (!display.textContent.includes('.')) display.textContent += '.';
}

function clear() {
  firstNum = null;
  secondNum = null;
  operator = null;
  display.textContent = '0';
}

function evaluate() {
  if (firstNum == null && secondNum == null) return;
  let result = 0;

  if (operator && firstNum != null && secondNum == null) {
    result = operate(firstNum, firstNum, operator);
  } else {
    secondNum = Number(display.textContent);
    result = operate(firstNum, secondNum, operator);
  }

  secondNum = null;
  firstNum = null;
  operator = null;
  display.textContent = result;
  equalFlag = true;
}
function deleteDisplay() {
  // To refresh the display instead of popping the result
  if (equalFlag) {
    equalFlag = false;
    display.textContent = '0';
  }
  display.textContent = display.textContent.slice(0, display.textContent.length - 1);
  if (display.textContent == '') display.textContent = '0';
}