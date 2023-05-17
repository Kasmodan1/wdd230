const hambutton = document.querySelector(".hamberger");
hambutton.addEventListener("click", toggleMenu, false);

function toggleMenu() {
  document.querySelector(".navi").classList.toggle("responsive");
}
