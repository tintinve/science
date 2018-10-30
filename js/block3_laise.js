"use strict";

/** show input field based on which issue method is selected */
const allsubscriptionBox = document.querySelectorAll(
  '.radio_button input[type="radio"]'
);
allsubscriptionBox.forEach(p =>
  p.addEventListener("click", () => {
    // remove previously checked
    allsubscriptionBox.forEach(p => {
      p.parentElement.style.border = "none";
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
  })
);
