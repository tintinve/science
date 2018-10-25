"use strict";
// when pick a size for jacket, automaticly mark that jacket-gender to be selectede
const genderJacketSelectS = document.querySelectorAll("select.jacket");
genderJacketSelectS.forEach(g => g.addEventListener("change", markSelect));
function markSelect(g) {
  // if already selected a gender, then remove it to reset
  if (document.querySelector("input.jacket-gender[checked]")) {
    document
      .querySelector("input.jacket-gender[checked]")
      .removeAttribute("checked");
  }
  // remove the default selected option (the 'choose size' text one)
  if (g.target.querySelector("option[selected]")) {
    g.target.querySelector("option[selected]").removeAttribute("selected");
  }
  console.log(g.target.value);
  // mark checked to the one that's clicked
  g.target.parentElement
    .querySelector('input[type="radio"')
    .setAttribute("checked", "checked");
  // remove the grey-out color of h3 if this was the case. need this because user can switch between the 2 genders
  document
    .querySelector("input.jacket-gender[checked]")
    .parentElement.querySelector("h3")
    .classList.remove("grey-out");
  // grey-out the jacket-gender that's not selected
  document
    .querySelector("input.jacket-gender:not([checked])")
    .parentElement.querySelector("h3")
    .classList.add("grey-out");
  //remove any selected size of the unchosen gender
  document
    .querySelector("input.jacket-gender:not([checked])")
    .parentElement.querySelector("select").value = "";
}
