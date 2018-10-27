"use strict";

/**
 * live validation of input field
 */

const form = document.querySelector("form");
const inputFieldS = document.querySelectorAll("input");
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
    if (validCount === inputFieldS.length) {
      submitButton.classList.remove("not-active");
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
            adress.value = `${dataArray[i].Firma} ${dataArray[i].Gade}`;
            adress.className = "true";
          }
        }
        // else {
        //   postNrInput.className = "false";
        // }
      }
    });
}
