const hambutton = document.querySelector(".hamburger");
const navigation = document.querySelector(".navi");
const closeMenu = document.querySelector(".closebtn");
//*** Adding event Listeners ***************
hambutton.addEventListener("click", openNav, false);
closeMenu.addEventListener("click", closeNav, false);
// ToggleMenu function  **********************
function toggleMenu() {
  navigation.classList.toggle("responsive");
}
// Join Chambers button function
function buttonClick() {
  // point it to the join.html page
  window.location.href = "join.html";
}
//Side Nav overlay functions ******************
function openNav() {
  const sideNav = document.getElementById("mySidenav");
  const mainContent = document.getElementById("main");
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  sideNav.style.width = "240px";
  if (mainContent) {
    mainContent.classList.add("pushed");
  }
  if (header) {
    header.classList.add("pushed");
  }
  if (footer) {
    footer.classList.add("pushed");
  }
}
// Side Nav overlay functions
function closeNav() {
  const sideNav = document.getElementById("mySidenav");
  const mainContent = document.getElementById("main");
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  sideNav.style.width = "0";
  if (mainContent) {
    mainContent.classList.remove("pushed");
  }
  if (header) {
    header.classList.remove("pushed");
  }
  if (footer) {
    footer.classList.remove("pushed");
  }
}

