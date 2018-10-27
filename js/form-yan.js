"use strict";
const form = document.querySelector("form");
const inputFieldS = document.querySelectorAll("input");
inputFieldS.forEach(checkInput);
function checkInput(input, i) {
  input.addEventListener("blur", () => {
    if (form.elements[i].validity.valid) {
      input.classList.add("true");
    } else {
      input.classList.add("false");
    }
  });
}
