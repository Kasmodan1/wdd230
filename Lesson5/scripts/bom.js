const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("ul");

buttonElement.addEventListener('click', function() {
  const inputValue = inputElement.value.trim();

  if (inputValue !== "") {
    console.log("Imput is not blank");

    const liElement = document.createElement("li");
    liElement.textContent = inputElement;
  }
  else {
    console.log("input is blank");
    

  }


  //listElement.appendChild(liElement);

  const deleteButton = document.createElement("button");



});