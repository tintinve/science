/* ASK JONAS WHYT PARCEL DOES NOT ALLOWS TO FETCH FROM A LOCAL JSON FILE AND LIVE-SERVER DOES
const template = document.querySelector("#template1").content;
const main = document.querySelector("main");
fetch("bigArticles.json")
  .then(res => res.json())
  .then(data => show(data));

function show(data) {
  console.log(data);
}*/
