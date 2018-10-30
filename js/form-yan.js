"use strict";

/**
 * select which jacket, for man or women
 */
// when pick a size for jacket, automaticly mark that jacket-gender to be selectede
const genderJacketSelectS = document.querySelectorAll("input[name='trin1']");
const jacketP = document.querySelector(".block6 .jacket-choice");

genderJacketSelectS.forEach(g => g.addEventListener("change", markSelect));
function markSelect(g) {
  let chosen = g.target.getAttribute("value");
  jacketP.textContent = "";
  jacketP.textContent += `Windbreaker`;
  if (chosen.indexOf("d") > -1) {
    jacketP.textContent += ` Damen size: ${chosen[
      chosen.length - 1
    ].toUpperCase()}`;
  } else {
    jacketP.textContent += ` Herre size: ${chosen[
      chosen.length - 1
    ].toUpperCase()}`;
  }
}
/**
 * get nr of issue and write to block 6
 * calculate the full price
 */
/** show input field based on which issue method is selected */
const allsubscriptionBox = document.querySelectorAll(
  '.radio_button input[type="radio"]'
);
const issueP = document.querySelector(".block6 .issue-choice");
let choiceCheck = false;

allsubscriptionBox.forEach(p =>
  p.addEventListener("click", () => {
    choiceCheck = true;
    // remove previously checked
    allsubscriptionBox.forEach(p => {
      p.parentElement.style.border = "none";
      p.removeAttribute("checked");
    });
    // add newly checked
    document
      .querySelector('input[name="nr-of-issues"]:checked')
      .setAttribute("checked", "checked");
    // add border highlight to checked issue
    document.querySelector(
      'input[name="nr-of-issues"]:checked'
    ).parentElement.style.border = "2px solid #0077ff";

    document.querySelector(
      'input[name="nr-of-issues"]:checked'
    ).nextElementSibling.nextElementSibling.style.display = "inherit";
    issueP.textContent = "";
    issueP.textContent += p.nextElementSibling.textContent + " magazines ";
    issueP.textContent +=
      p.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
    let sumStringWithComma;
    let originalText =
      p.nextElementSibling.nextElementSibling.nextElementSibling
        .nextElementSibling.textContent;
    if (originalText.indexOf("for") > -1) {
      let priceString = originalText.substring(
        originalText.indexOf("for") + 4,
        originalText.indexOf("kr")
      );
      let priceNr = Number(priceString.replace(",", ""));
      let sum = priceNr + 3950; // porto
      let sumString = String(sum);
      sumStringWithComma =
        sumString.substring(0, sumString.length - 2) +
        "," +
        sumString.substring(sumString.length - 2);
      document.querySelector(".i-alt").textContent =
        "I Alt: " + sumStringWithComma + " kr.";
    }
  })
);

/**
 * live validation of input field
 */

const form = document.querySelector("form");
const inputFieldS = document.querySelectorAll(
  "div.block4>div>input:not([type='radio'])"
);
const paymentBlockElementS = document.querySelectorAll(".pay");
const mobilePayInput = document.querySelector("#mobile-pay-nr");
const submitButton = document.querySelector('button[type="submit"]');
const mobilePaySubmit = document.querySelector("#mobile-pay-confirm");

let formCheck = false;
let paymentCheck = false;
let agreementCheck = false;

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
    if (validCount === inputFieldS.length) {
      formCheck = true;
      checkAll();
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
      p.parentElement.style.height = "50px";
    });
    // add newly checked
    document
      .querySelector('input[name="payment"]:checked')
      .setAttribute("checked", "checked");
    // add border highlight to checked payment and expand the card/mobile-pay/giro section
    document.querySelector(
      'input[name="payment"]:checked'
    ).parentElement.style.border = "2px solid #0077ff";
    if (
      document.querySelector('input[name="payment"]:checked').value ===
      "girokort"
    ) {
      document.querySelector(
        'input[name="payment"]:checked'
      ).parentElement.style.height = "100px";
    } else if (
      document.querySelector('input[name="payment"]:checked').value ===
      "mobile-pay"
    ) {
      document.querySelector(
        'input[name="payment"]:checked'
      ).parentElement.style.height = "130px";
    } else {
      document.querySelector(
        'input[name="payment"]:checked'
      ).parentElement.style.height = "200px";
    }
    document.querySelector(
      'input[name="payment"]:checked'
    ).nextElementSibling.nextElementSibling.style.display = "inherit";
    // check card input
    if (p.value === "girokort") {
      paymentCheck = true;
      checkAll();
    } else {
      let inputS = p.nextElementSibling.nextElementSibling.querySelectorAll(
        "p input"
      );
      let validCount = 0;
      inputS.forEach(checkValid);
      function checkValid(i) {
        i.addEventListener("input", () => {
          if (i.validity.valid) {
            validCount++;
            if (validCount === inputS.length) {
              paymentCheck = true;
              checkAll();
            }
          }
        });
      }
    }

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
  //  m.target.parentElement.style.transform = "scale(0)";
  m.target.parentElement.parentElement.style.height = "50px";
  m.target.parentElement.style.display = "none";
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

/**
 * check agreement
 */
const agreement = document.querySelector("input#agreement");
agreement.addEventListener("change", checkAgreement);
function checkAgreement() {
  if (agreement.checked) {
    agreementCheck = true;
    checkAll();
  }
}
/**
 * show button when everything is set
 */
checkAll();
function checkAll() {
  if (
    formCheck === true &&
    choiceCheck === true &&
    paymentCheck === true &&
    agreementCheck === true
  ) {
    submitButton.classList.add("live");
  }
}

// masking
// detect card type and only show img of chosen type
/* remember */
// use type='text' pattern="[0-9]*" to get only the num keyboard, use number gives keyboard with top num line, use tel is not sementicly correct
