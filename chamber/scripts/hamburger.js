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
  document.getElementById("mySidenav").style.width = "240px";
  document.getElementById("main").classList.add("pushed");
  document.getElementById("header").classList.add("pushed");
  document.getElementById("footer").classList.add("pushed");

}
  
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").classList.remove("pushed");
  document.getElementById("header").classList.remove("pushed");
  document.getElementById("footer").classList.remove("pushed");

}

// This is to get the date displayed ***********
//const datefield = document.querySelector("#datefield");
//const now = new Date();
//const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
//datefield.textContent = fulldate;

