"use strict";

/**
 * live validation of input field
 */

const form = document.querySelector("form");
const inputFieldS = document.querySelectorAll(
  "div.block4>div>input:not([type='radio'])"
);
console.log(inputFieldS);

const paymentBlockElementS = document.querySelectorAll(".pay");
const mobilePayInput = document.querySelector("#mobile-pay-nr");
const submitButton = document.querySelector('button[type="submit"]');
const mobilePaySubmit = document.querySelector("#mobile-pay-confirm");

inputFieldS.forEach(checkInput);
function checkInput(input, i) {
  //check validity of the input flied that loses focus
  input.addEventListener("input", () => {
    if (form.elements[i].validity.valid) {
      input.className = "true";
    } else {
      input.className = "false";
    }
    // check how many input field has passed validity check, when all passed then allow submit button
    let validCount = document.querySelectorAll(".true").length;
    console.log(validCount);
    if (validCount === inputFieldS.length) {
      // show payment
      //      paymentBlockElementS.forEach(e => (e.style.display = "inline-block"));
      // document.querySelector("h1.pay").scrollIntoView({
      //   block: "start",
      //   inline: "nearest",
      //   behavior: "smooth"
      // });
    }
  });
}
/**
 * get address based on post number
 */
const postNrInput = document.querySelector("#post-nr");
const by = document.querySelector("#by");
const adress = document.querySelector("#address");

let dataArray = [];
postNrInput.addEventListener("input", getDataBasedonPostNr);
function getDataBasedonPostNr() {
  fetch("js/postnummer.json")
    .then(data => data.json())
    .then(d => {
      dataArray = d;
      let userInputNr = postNrInput.value;
      dataArray.forEach(findMatch);
      function findMatch(p, i) {
        if (Number(userInputNr) === p.Postnr) {
          postNrInput.className = "true";
          by.textContent = `${dataArray[i].Bynavn}`;
          if (dataArray[i].Gade || dataArray[i].Firma) {
            adress.value = dataArray[i].Firma
              ? `${dataArray[i].Firma}, ${dataArray[i].Gade}`
              : `${dataArray[i].Gade}`; // so that if no Firma, Gade doesn't start with a comma and an empty space
            adress.className = "true";
          }
        }
        // else {
        //   postNrInput.className = "false";
        // }
      }
    });
}

/**
 * show input field based on which payment method is selected
 */
const allPaymentMethodS = document.querySelectorAll('.pay input[type="radio"]');
allPaymentMethodS.forEach(p =>
  p.addEventListener("click", () => {
    // remove previously checked
    allPaymentMethodS.forEach(p => {
      p.removeAttribute("checked");
      p.removeAttribute("class");
      p.nextElementSibling.style.opacity = "1";
      p.nextElementSibling.nextElementSibling.style.transform = "scale(0)"; // individual payment input area
      p.parentElement.style.border = "none";
    });
    // add newly checked
    document
      .querySelector('input[name="payment"]:checked')
      .setAttribute("checked", "checked");
    // add border highlight to checked payment
    document.querySelector(
      'input[name="payment"]:checked'
    ).parentElement.style.border = "2px solid blue";
    // hide text label of payment, so that it doesn't overlap with payment icons
    // document.querySelector(
    //   'input[name="payment"]:checked+label'
    // ).style.opacity = "0";
    // show the selected payment wrapper
    document.querySelector(
      'input[name="payment"]:checked ~ .payment-label-around-div'
    ).style.transform = "scale(1)";
    // auto focus input field for the selected payment
    document
      .querySelector(
        'input[name="payment"]:checked ~ .payment-label-around-div input'
      )
      .focus();
  })
);

// close card when click on X
const closeXS = document.querySelectorAll(".close");
closeXS.forEach(x => x.addEventListener("click", closeCard));
function closeCard(m) {
  m.target.parentElement.style.transform = "scale(0)";
  m.target.parentElement.previousElementSibling.style.opacity = "1";
  m.target.parentElement.parentElement
    .querySelector('input[type="radio"]')
    .removeAttribute("checked");
  mobilePayInput.value = "";
  mobilePaySubmit.className = "not-active";
  submitButton.className = "not-active";
}

/**
 * check payment
 */
const paymentS = document.querySelectorAll('input[name="payment"]');
paymentS.forEach(p => p.addEventListener("change", checkPaymentChoice));
function checkPaymentChoice() {
  let paymentChoice = document.querySelectorAll(
    'input[name="payment"][checked]'
  );
  mobilePayInput.addEventListener("input", checkMobilePay);
  function checkMobilePay() {
    if (paymentChoice[0].id === "mobile-pay" && mobilePayInput.validity.valid) {
      mobilePaySubmit.classList.remove("not-active");
      window.scrollTo(0, 270);
    }
  }
}
//      submitButton.classList.remove("not-active");

// masking
// detect card type and only show img of chosen type
/* remember */
// use type='text' pattern="[0-9]*" to get only the num keyboard, use number gives keyboard with top num line, use tel is not sementicly correct
