"use strict";

/** show input field based on which issue method is selected */
const allsubscriptionBox = document.querySelectorAll(
  '.radio_button input[type="radio"]'
);
const issueP = document.querySelector(".block6 .issue-choice");

allsubscriptionBox.forEach(p =>
  p.addEventListener("click", () => {
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
    ).parentElement.style.border = "2px solid blue";

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
        "I Alt: " + sumStringWithComma + "kr.";
    }
  })
);
