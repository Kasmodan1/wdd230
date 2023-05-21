const hambutton = document.querySelector(".hamburger");
hambutton.addEventListener("click", toggleMenu, false);

function toggleMenu() {
  document.querySelector(".navi").classList.toggle("responsive");
}
