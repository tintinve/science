// Boring burger menu START
function myFunction(x) {
  x.classList.toggle("change");
}

const container = document.querySelector(".container");
container.addEventListener("click", e => {
  myFunction(container);
});
// // Boring burger menu END
