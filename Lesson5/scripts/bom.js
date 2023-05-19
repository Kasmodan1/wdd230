const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("ul");

buttonElement.addEventListener('click', function() {
  const inputValue = inputElement.value.trim();

  if (inputValue !== "") {
    console.log("Imput is not blank");

    const liElement = document.createElement("li");
    const deleteButton = document.createElement("button");

    liElement.textContent = inputValue;
    deleteButton.textContent = "❌";

    liElement.appendChild(deleteButton);

    listElement.appendChild(liElement)

    deleteButton.addEventListener("click", function() {
      liElement.remove();
    });

    inputElement.focus();

    inputElement.value = "";

  }
  else {
    console.log("input is blank");
    
  };

});