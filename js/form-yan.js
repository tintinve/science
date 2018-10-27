"use strict";

/**
 * live validation of input field
 */

const form = document.querySelector("form");
const inputFieldS = document.querySelectorAll(
  "form>div>input:not([type='radio'])"
);
const paymentBlockElementS = document.querySelectorAll(".pay");
const submitButton = document.querySelector('button[type="submit"]');
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
      paymentBlockElementS.forEach(e => (e.style.display = "inherit"));
      document.querySelector("h1.pay").scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth"
      });
      //      submitButton.classList.remove("not-active");
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
    });
    // add newly checked
    document
      .querySelector('input[name="payment"]:checked')
      .setAttribute("checked", "checked");
    // hide text label of payment, so that it doesn't overlap with payment icons
    document.querySelector(
      'input[name="payment"]:checked+label'
    ).style.opacity = "0";
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
