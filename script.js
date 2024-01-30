
let firstNum;
let secondNum;
let operator;
let display;

initCalc();

function initCalc() {
  firstNum = null;
  secondNum = null;
  operator = null;
  display = document.querySelector('.display');
  let numBtns = document.querySelectorAll('.number');
  let dotBtn = document.querySelector('.dot');
  let equalBtn = document.querySelector('.equal');
  let clearBtn = document.querySelector('.clear');
  let opsBtn = document.querySelectorAll('.operator');

  numBtns.forEach(numBtn => { numBtn.addEventListener('click', numPress) });
  opsBtn.forEach(opBtn => { opBtn.addEventListener('click', opPress) });
  dotBtn.addEventListener('click', setDot);
  clearBtn.addEventListener('click', clear);
  equalBtn.addEventListener('click', evaluate);
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

function numPress() {
  let numPressed = Number(this.textContent);

  // // 
  // if (operator == null) {
  //   operator = '';
  //   display.textContent = 0;
  // }

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

function opPress() {

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

  operator = this.textContent;
}

function setDot() {
  // if (firstNum == null && operator == null) {
  // if (!operator) {
  //   operator = '';
  //   display.textContent = 0;
  // }
  // if (operand && firstNum != null && secondNum == null) {
    
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
}
