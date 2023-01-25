"use strict";

const tip_amount = document.getElementById("d1");
const total = document.getElementById("d2");
const inputs = document.querySelectorAll("input");
const sp = document.getElementsByClassName("custom")[0].children;
const error_number = document.getElementById("error_number");
const cust_input = document.getElementById("custom_input");
const resetbtn = document.getElementById("resetBtn")
let sp1 = inputs[0];
let sp2 = inputs[inputs.length - 1];
let active = false

/**Main Algorithm */
const calculateTip = (value) => {
  let tipTotal = ((value / 100).toFixed(2) * sp1.value).toFixed(2);
  let ttl = (Number(sp1.value) + Number(tipTotal)).toFixed(2);
  let tpp = (tipTotal / sp2.value).toFixed(2);
  let ttpp = (ttl / sp2.value).toFixed(2);
  tpp ? (tip_amount.innerHTML = `$${tpp}`) : tip_amount.nodeValue;
  ttpp ? (total.innerHTML = `$${ttpp}`) : total.nodeValue;
};

/**Event Listener for Bill input*/
sp1.addEventListener("change", (e) => {
  let value = e.target.value;
  if (sp2.value && cust_input.value) calculateTip(value);
});

/**Event Listener for Number of people input*/
sp2.addEventListener("change", (e) => {
  let value = e.target.value;
  checkZero(value)
  if (sp1.value && cust_input.value) calculateTip(value);
});

const toggleBtn = (btn) => {
  if (active) {
    btn.style.backgroundColor = "hsl(172, 67%, 45%)"
  } else {
    btn.style.backgroundColor = ""
  }
}

/**Event listener for all button in tip selection */
for (let i = 0; i < sp.length; i++) {
  sp[i].addEventListener("click", (e) => {
    active = !active
    let text = String(e.target.value);
    let sign = text.indexOf("%")
    let value = active === true ? text.slice(0, sign) : ""
    calculateTip(value);
    toggleBtn(sp[i])
  });
}

const checkZero = (value) => {
  if (value === 0 || value === "0") {
    error_number.style.opacity = "1"
    error_number.style.color = "red"
    sp2.parentElement.style.borderColor = "red"
    //return
  }  else {
    error_number.style.opacity = "0"
    sp2.parentElement.style.borderColor = ""
  }
}

/**Event listener for custom tip value */
cust_input.addEventListener("change", (e) => {
  let value = e.target.value;
  calculateTip(value);
});

function reset() {
  if (tip_amount !== "" && total !== "") {
    tip_amount.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }
}

resetbtn.addEventListener("click", (e) => {
  reset()
})
