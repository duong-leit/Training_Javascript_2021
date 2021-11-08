const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let billTotal = $("#billTotal");
let numberDivision = $("#numberDivision");
let tipCustom = $(".tip-option.opt-custom");
let tipPerPerson = $("#tipPerPerson");
let totalPerPerson = $("#totalPerPerson");
let resetBtn = $("#btn-reset");

billTotal.addEventListener("input", function () {
  let tipNumber = $(".tip-option.active");

  calculate(billTotal, numberDivision, tipNumber);
});

numberDivision.addEventListener("input", function () {
  let tipNumber = $(".tip-option.active");
  calculate(billTotal, numberDivision, tipNumber);
});

numberDivision.addEventListener("blur", function () {
  if (!isValidInput(this, 1)) {
    $("span.error-number").style.display = "inline";
    return;
  }
  $("span.error-number").style.display = "none";
});
tipCustom.addEventListener("focus", function () {
  let tipNumber = $("button.tip-option.active");
  if (tipNumber) {
    tipNumber.classList.remove("active");
  }
  this.classList.add("active");
});

tipCustom.addEventListener("input", function () {
  calculate(billTotal, numberDivision, this);
});

resetBtn.addEventListener("click", function () {
  let resetInput = $$("input");
  let resetLength = resetInput.length;
  let tipNumber = $(".tip-option.active");
  if (tipNumber) tipNumber.classList.remove("active");
  for (let i = 0; i < resetLength; i++) {
    if (i === 2) resetInput[i].value = 0;
    else resetInput[i].value = "0.00";
  }
  $("span.error-number").style.display = "none";
});

function isValidInput(checkInput, checkValue, isChange = false, resetValue) {
  if (!checkInput) return false;
  let checkInputValue = Number(checkInput.value);
  if (checkInputValue < checkValue) {
    if (isChange) checkInput.value = 0;
    return false;
  }
  return true;
}

function calculate(quatientInput, diviorInput, tipInput) {
  let quatient, divior, tip;
  if (!isValidInput(quatientInput, 0, true, "0.00")) {
    quatient = 0;
  } else if (!isValidInput(diviorInput, 1, true, "0")) {
    quatient = 0;
    divior = 1;
  } else if (!isValidInput(tipInput, 0, true, "0.00")) {
    tip = 0;
  } else {
    quatient = parseFloat(quatientInput.value);
    divior = parseInt(diviorInput.value);
    tip = parseFloat(tipInput.value);
    tipPerPerson.value = ((quatient * tip) / (100 * divior)).toFixed(2);
    totalPerPerson.value = ((quatient * (1 + tip / 100)) / divior).toFixed(2);
  }
}

function onClickTipBtn(tipBtn) {
  let tipNumber = $(".tip-option.active");
  if (tipNumber) tipNumber.classList.remove("active");
  tipBtn.classList.add("active");
  if (tipCustom.value != 0) tipCustom.value = 0;
  calculate(billTotal, numberDivision, tipBtn);
}
