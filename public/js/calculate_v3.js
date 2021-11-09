const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//url
const url = `https://plitter-server.vercel.app/api/`;

// element
let billTotal = $("#billTotal");
let numberDivision = $("#numberDivision");
let tipCustom = $(".tip-option.opt-custom");
let tipBtnArr = $$("button.tip-option");
let tipPerPerson = $("#tipPerPerson");
let totalPerPerson = $("#totalPerPerson");
let resetBtn = $("#btn-reset");
let submitBtn = $("#btn-submit");

billTotal.addEventListener("input", function () {
  let isValid = validate("#billTotal", "bill");
  switch (isValid) {
    case 0:
      resetValueInput("#billTotal", "0");
      break;
    case 1:
      this.value = this.value.replace(/[e\+\-]/gi, "");
      if (parseInt(numberDivision.value) == 0) {
        if (parseInt(this.value) == 0) {
          $("span.error-number").style.display = "none";
          return;
        }
        $("span.error-number").style.display = "inline";
      } else {
        let tipTag = $(".tip-option.active");
        let tipPercent = 0;
        if (tipTag) tipPercent = tipTag.value;
      }
      break;
  }
});

numberDivision.addEventListener("input", function () {
  let isValid = validate("#numberDivision", "people");
  switch (isValid) {
    case 0:
      resetValueInput("#numberDivision", "0");
      break;
    case 1:
      this.value = this.value.replace(/[e\+\-]/gi, "");
      let billValue = parseFloat(billTotal.value);
      if (billValue == 0) {
      } else {
        if (!parseInt(numberDivision.value)) {
          //check bill !=0, people ==0
          $("span.error-number").style.display = "inline";
        } else {
          $("span.error-number").style.display = "none";
          let tipTag = $(".tip-option.active");
          let tipPercent = 0;
          if (tipTag) tipPercent = tipTag.value;
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
      this.value = this.value.replace(/[e\+\-]/gi, "");
      let billValue = parseFloat(billTotal.value);
      if (billValue == 0) {
      } else {
        if (!parseInt(numberDivision.value)) {
          //check bill !=0, people ==0
          $("span.error-number").style.display = "inline";
        } else {
          $("span.error-number").style.display = "none";
          let tipPercent = tipCustom.value || 0;
        }
      }
      break;
  }
});

[billTotal, numberDivision, tipCustom].forEach((element) => {
  element.addEventListener("keypress", (e) => {
    if (["+", "-", "e"].includes(e.key)) {
      e.preventDefault();
    }
  });
});

function onClickTipBtn(e) {
  let currentTipBtn = $(`button.tip-option.active`);
  if (currentTipBtn) {
    if (currentTipBtn.id == e.id) {
      currentTipBtn.classList.remove("active");
    } else {
      currentTipBtn.classList.remove("active");
      e.classList.add("active");
    }
  } else {
    e.classList.add("active");
  }
}

function validate(tagName = -1, typeTag) {
  //-1: notAvalable; 0: reset ; 1: calculate
  if (!tagName || tagName == -1) {
    return -1;
  }
  let tagElement = $(tagName);
  let tagValue = tagElement.value;
  if (!tagValue) {
    return 0;
  }
  let minValue = 0;
  switch (typeTag) {
    case "bill":
      minValue = 0;
      tagValue = parseFloat(tagValue);
      break;

    case "tip":
      minValue = 0;
      tagValue = parseFloat(tagValue);
      break;

    case "people":
      minValue = 1;
      tagValue = parseInt(tagValue);
      break;
    default:
      return -1;
  }
  if (tagValue < 0) {
    return 0;
  }
  return 1;
}

function resetValueInput(tagName, valueReset) {
  // float: "0.00"; int "0"

  $(tagName).value = valueReset;
}

async function calculate(
  billValue,
  peopleValue = 1,
  tipValue,
  tipAmount,
  totalAmount
) {
  try {
    billValue = billValue ? parseFloat(billValue) : 0;
    peopleValue = peopleValue ? parseInt(peopleValue) : 1;
    tipValue = peopleValue ? parseFloat(tipValue) : 0;
    let data = await getData(billValue, peopleValue, tipValue);
    data = await data.json();
    if (data["result"] == true) {
      tipAmount.value = data["amount"].toFixed(2);
      totalAmount.value = data["total"].toFixed(2);
    }
  } catch (error) {
    alert("try it later");
  }
}

function isActiveTip(tagName, classRemove) {
  let currentTip = $(classRemove);
  let newTip = $(tagName);
  if (currentTip.id == newTip.id) {
    currentTip.classList.remove("active");
  }
  $(classRemove).classList.remove("active");
  $(tagName).classList.toggle("active");
}

async function getData(bill = 0, people = 1, tip = 0) {
  return fetch(
    `${url}calculate?bill=${bill}&people=${people}&tipPercent=${tip}`
  );
}

function onclickSubmitForm() {
  resetBtn.disabled = submitBtn.disabled = true;
  let bill = billTotal.value;
  let people = numberDivision.value;
  let tip = 0;
  let tipDefault = $("button.tip-option.active");
  if (tipDefault) {
    tip = tipDefault.value;
  } else if (tipCustom.value) {
    tip = tipCustom.value;
  }
  calculate(bill, people, tip, tipPerPerson, totalPerPerson).then(function () {
    resetBtn.disabled = submitBtn.disabled = false;
  });
}
