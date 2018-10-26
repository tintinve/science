"use strict";
/**
 * select which jacket, for man or women
 */
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
  // mark checked to the one that's clicked
  g.target.parentElement
    .querySelector('input[type="radio"')
    .setAttribute("checked", "checked");
  // remove the grey-out color of h3 if this was the case. need this because user can switch between the 2 genders
  let chosen = document
    .querySelector("input.jacket-gender[checked]")
    .parentElement.querySelector("h3");
  chosen.classList.remove("grey-out");
  updateJacketChoice(`${chosen.textContent} Size: ${g.target.value}`);
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
const jacketP = document.querySelector(".block6 .jacket-choice");
const issueP = document.querySelector(".block6 .issue-choice");

function updateJacketChoice(j) {
  jacketP.textContent = j;
}
/**
 * get nr of issue and write to block 6
 * calculate the full price
 */
let nrOfIssue = document.querySelectorAll('.block3 input[type="radio"]');
nrOfIssue.forEach(n =>
  n.addEventListener("change", () => {
    issueP.textContent = "";
    issueP.textContent += n.nextElementSibling.textContent;
    issueP.textContent += n.nextElementSibling.nextElementSibling.textContent;
    let sumStringWithComma;
    let originalText = n.nextElementSibling.nextElementSibling.textContent;
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
        "I Alt: " + sumStringWithComma + "kr.";
    }
  })
);
