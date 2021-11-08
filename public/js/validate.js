const billTotal = document.getElementById("billTotal");
const numberOfPeople = document.getElementById("numberOfPeople");
billTotal.onblur = function () {
  let valueThis = this.value;
  console.log("value:", valueThis);
  if (!valueThis || isNaN(valueThis)) {
    return alert("value must be a Number");
  }
  if (valueThis < 0) {
    return alert(`value is not less than 0`);
  }
};
numberOfPeople.onblur = function () {
  let valueThis = this.value;
  console.log("value:", valueThis);
  if (!valueThis || isNaN(valueThis)) {
    return alert("value must be a Number");
  }
  if (valueThis < 0) {
    return alert(`value is not less than 0}`);
  }
};
