const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let billTotal = $("#billTotal");
let numberDivision = $("#numberDivision");
let tipCustom = $(".tip-option.opt-custom");
let tipPerPerson = $("#tipPerPerson");
let totalPerPerson = $("#totalPerPerson");
let resetBtn = $("#btn-reset");

billTotal.addEventListener("input", function () {
  let isValid = validate("#billTotal", "bill");
  switch (isValid) {
    case -1:
      break;
    case 0:
      resetValueInput("#billTotal", "0.00");
      break;
    case 1:
      if (parseInt(numberDivision.value) == 0) {
        if (parseInt(this.value) == 0) {
          $("span.error-number").style.display = "none";
          return;
        }
        $("span.error-number").style.display = "inline";
        calculate(0, 1, 0, tipPerPerson, totalPerPerson);
      } else {
        let tipTag = $(".tip-option.active");
        let tipPercent = 0;
        if (tipTag) tipPercent = tipTag.value;
        calculate(
          billTotal.value,
          numberDivision.value,
          tipPercent,
          tipPerPerson,
          totalPerPerson
        );
      }
      break;
  }
});

numberDivision.addEventListener("input", function () {
  let isValid = validate("#numberDivision", "people");
  switch (isValid) {
    case -1:
      break;
    case 0:
      resetValueInput("#numberDivision", "0");
      break;
    case 1:
      let billValue = parseFloat(billTotal.value);
      if (billValue == 0) {
        calculate(0, 1, 0, tipPerPerson, totalPerPerson);
      } else {
        if (!parseInt(numberDivision.value)) {
          //check bill !=0, people ==0
          $("span.error-number").style.display = "inline";
          calculate(0, 1, 0, tipPerPerson, totalPerPerson);
        } else {
          $("span.error-number").style.display = "none";
          let tipTag = $(".tip-option.active");
          let tipPercent = 0;
          if (tipTag) tipPercent = tipTag.value;
          calculate(
            billTotal.value,
            numberDivision.value,
            tipPercent,
            tipPerPerson,
            totalPerPerson
          );
        }
      }
      break;
  }
});

resetBtn.addEventListener("click", function () {
  let calculateList = $$(".bill input");
  let tipBtn = $(".tip-option.active");
  let resetLength = calculateList.length;
  for (let i = 0; i < resetLength; i++) {
    if (i === 2) calculateList[i].value = "0";
    else calculateList[i].value = "0.00";
  }
  if (tipBtn) tipBtn.classList.remove("active");
});

tipCustom.addEventListener("focus", function () {
  let currentTipBtn = $(`button.tip-option.active`);
  if (currentTipBtn) currentTipBtn.classList.remove("active");
});

tipCustom.addEventListener("input", function () {
  let isValid = validate(".tip-option.opt-custom", "tip");
  switch (isValid) {
    case -1:
      break;
    case 0:
      resetValueInput(".tip-option.opt-custom", "0");
      break;
    case 1:
      let billValue = parseFloat(billTotal.value);
      if (billValue == 0) {
        calculate(0, 1, 0, tipPerPerson, totalPerPerson);
      } else {
        if (!parseInt(numberDivision.value)) {
          //check bill !=0, people ==0
          $("span.error-number").style.display = "inline";
          calculate(0, 1, 0, tipPerPerson, totalPerPerson);
        } else {
          $("span.error-number").style.display = "none";
          let tipPercent = tipCustom.value || 0;

          calculate(
            billTotal.value,
            numberDivision.value,
            tipPercent,
            tipPerPerson,
            totalPerPerson
          );
        }
      }
      break;
  }
});

function onClickTipBtn(e) {
  let currentTipBtn = $(`button.tip-option.active`);
  let peopleNumber;
  let billNumber = 1;
  if (currentTipBtn) currentTipBtn.classList.remove("active");
  e.classList.add("active");
  tipCustom.value = "";
  if (numberDivision.value == 0) {
    console.log("oke");
    calculate(0, 1, 0, tipPerPerson, totalPerPerson);
  } else {
    calculate(
      billTotal.value,
      numberDivision.value,
      e.value,
      tipPerPerson,
      totalPerPerson
    );
  }
}

function validate(tagName = -1, typeTag) {
  //-1: notAvalable; 0: reset ; 1: calculate
  if (!tagName || tagName == -1) {
    return -1;
  }
  let tagElement = $(tagName);
  let tagValue = tagElement.value;
  let minValue = 0;
  switch (typeTag) {
    case "bill":
      minValue = 0;
      tagValue = parseFloat(tagValue);
      //do something
      break;

    case "tip":
      //do something
      minValue = 0;
      tagValue = parseFloat(tagValue);
      break;

    case "people":
      minValue = 1;
      tagValue = parseInt(tagValue);
      //do something
      break;
    default:
      return -1;
  }
  if (tagValue < 0) {
    //reset element
    return 0;
  }
  if (typeTag == minValue) {
    return 1;
  }
  return 1;
}

function resetValueInput(tagName, valueReset) {
  // float: "0.00"; int "0"
  console.log("resetValueInput");

  $(tagName).value = valueReset;
}

function calculate(billValue, peopleValue, tipValue, tipAmount, totalAmount) {
  console.log(billValue, peopleValue, tipValue);
  billValue = parseFloat(billValue);
  peopleValue = parseInt(peopleValue);
  tipValue = parseFloat(tipValue);
  tipAmount.value = ((billValue * tipValue) / (100 * peopleValue)).toFixed(2);
  totalAmount.value = (
    (billValue * (100 + tipValue)) /
    (100 * peopleValue)
  ).toFixed(2);
}

function isActiveTip(tagName, classRemove) {
  console.log("isActiveTip");
  $(tagName).classList.add("active");
  $(classRemove).classList.remove("active");
}
