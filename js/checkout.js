"use strict";
/**
 * select which jacket, for man or women
 */
// when pick a size for jacket, automaticly mark that jacket-gender to be selectede
const genderJacketSelectS = document.querySelectorAll("input[name='trin1']");
const jacketP = document.querySelector(".block6 .jacket-choice");
const issueP = document.querySelector(".block6 .issue-choice");

genderJacketSelectS.forEach(g => g.addEventListener("change", markSelect));
function markSelect(g) {
  let chosen = g.target.getAttribute("value");
  console.log(chosen);
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
}
