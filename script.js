const buttons = document.getElementById('buttons');
const button = document.querySelectorAll('button');
const inputs = document.getElementsByClassName('input');
const totalAmount = document.getElementsByClassName('total');
const reset = document.getElementById('reset');
const active  = document.getElementsByClassName('active');
const error = document.getElementById('error');
const custom = document.getElementById('custom');

function btnchange(event) {
    const target = event.target;
    for (let i of button) {
      i.classList.remove('active');
    }
    if (target.tagName === "BUTTON") {
      target.classList.add('active');
      custom.value = '';
    }
    calculate();
};

function calculate() {
    if (inputs[0].value !== "" && inputs[1].value !== "") {
      let sum;
      const percentageInput = parseFloat(custom.value);
      if (!isNaN(percentageInput)) {
        sum = (calc() * percentageInput / 100) + calc();
      } else {
        sum = (calc() * +active[0].value / 100) + calc();
      }
      totalAmount[1].textContent = "$" + sum.toFixed(2);
      totalAmount[0].textContent = "$" + (sum - calc()).toFixed(2);
    }
    calc();
  }

custom.addEventListener('input', () => {
    const value = parseFloat(custom.value);
    if (!isNaN(value)) {
      const sum = (calc() * value / 100) + calc();
      totalAmount[1].textContent = "$" + sum.toFixed(2);
      totalAmount[0].textContent = "$" + (sum - calc()).toFixed(2);
    }
});

function calc() {
    let firstNumber = +inputs[0].value;
    let secondNumber = +inputs[1].value;
    if (inputs[1].value === '0') {
        inputs[1].style.border = "2px solid #E17052";
        inputs[1].value = "";
        error.style.display = "block"
        return;
    }
    inputs[1].style.border = "2px solid #26C2AE";
    error.style.display = "none";
    return firstNumber / secondNumber;
};

inputs[0].addEventListener('input', calculate);
inputs[1].addEventListener('input', calculate);
buttons.addEventListener('click', btnchange);

reset.addEventListener("click", () => {
    inputs[0].value = "";
    inputs[1].value = "";
    error.style.display = "none";
    custom.value = ""
    totalAmount[0].textContent = "$0.00";
    totalAmount[1].textContent = "$0.00";
    inputs[1].style.border = "none";
    active[0].classList.remove('active');
});