const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("ul");

buttonElement.addEventListener('click', function() {
  const inputValue = inputElement.value.trim();

  if (inputValue == "") {
    console.log("Imput is blank, go for it!");
  }
  else {
    console.log("input is not blank");
  }
});