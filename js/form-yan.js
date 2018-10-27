"use strict";
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
    console.log(validCount);
    if (validCount === inputFieldS.length) {
      submitButton.classList.remove("not-active");
    }
  });
}
