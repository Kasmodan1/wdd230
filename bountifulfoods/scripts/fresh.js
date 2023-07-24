document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('fresh-form');
  const outputContainer = document.getElementById('output-container');
  const modal = document.getElementById("order-modal");
  const closeModal = document.getElementsByClassName("close")[0];

  // Function to calculate nutritional information, generate the output, and show the modal
  function handleSubmitButtonClick(event) {
    event.preventDefault();

    // Get user inputs
    const firstName = document.getElementById('first-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const fruit1Id = document.getElementById('fruit1').value;
    const fruit2Id = document.getElementById('fruit2').value;
    const fruit3Id = document.getElementById('fruit3').value;
    const specialInstructions = document.getElementById('special-instructions').value;

    const currentDate = new Date();
    const orderDate = currentDate.toDateString();

    // Fetch the nutritional data from the JSON file and calculate the total nutritional values
    fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
      .then(response => response.json())
      .then(data => {
        const selectedFruits = [fruit1Id, fruit2Id, fruit3Id];
        const selectedFruitNames = selectedFruits.map(fruitId => {
          const selectedFruit = data.find(fruit => fruit.id === parseInt(fruitId));
          return selectedFruit ? selectedFruit.name : '';
        });

        let totalCarbohydrates = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalSugar = 0;
        let totalCalories = 0;

        selectedFruits.forEach(fruitId => {
          const selectedFruit = data.find(fruit => fruit.id === parseInt(fruitId));
          if (selectedFruit) {
            totalCarbohydrates += selectedFruit.nutritions.carbohydrates;
            totalProtein += selectedFruit.nutritions.protein;
            totalFat += selectedFruit.nutritions.fat;
            totalSugar += selectedFruit.nutritions.sugar;
            totalCalories += selectedFruit.nutritions.calories;
          }
        });

        // Generate the formatted output
        const output = `
          <h2>Order Summary:</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Selected Fruits:</strong> ${selectedFruitNames.join(", ")}</p>
          <p><strong>Special Instructions:</strong> ${specialInstructions}</p>
          <p><strong>Order Date:</strong> ${orderDate}</p>
          <h3>Total Nutritional Information:</h3>
          <p><strong>Total Carbohydrates:</strong> ${totalCarbohydrates.toFixed(2)} g</p>
          <p><strong>Total Protein:</strong> ${totalProtein.toFixed(2)} g</p>
          <p><strong>Total Fat:</strong> ${totalFat.toFixed(2)} g</p>
          <p><strong>Total Sugar:</strong> ${totalSugar.toFixed(2)} g</p>
          <p><strong>Total Calories:</strong> ${totalCalories}</p>
        `;

        // Store the submitted data in local storage
        const newSubmission = {
          firstName,
          email,
          phone,
          selectedFruits: selectedFruitNames,
          specialInstructions,
          orderDate,
          totalCarbohydrates: totalCarbohydrates.toFixed(2),
          totalProtein: totalProtein.toFixed(2),
          totalFat: totalFat.toFixed(2),
          totalSugar: totalSugar.toFixed(2),
          totalCalories
        };

        const submittedData = JSON.parse(localStorage.getItem('submittedData')) || [];
        submittedData.push(newSubmission);
        localStorage.setItem('submittedData', JSON.stringify(submittedData));

        // Display the output in the modal box
        outputContainer.innerHTML = output;
        modal.style.display = "block";
      })
      .catch(error => {
        console.error('Error fetching nutritional data:', error);
      });
  }

  // Close the modal when the user clicks on the close button (X)
  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when the user clicks outside the modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Event listener for the submit button
  form.addEventListener('submit', handleSubmitButtonClick);

  // Load the fruit options from the JSON data
  fetch('https://brotherblazzard.github.io/canvas-content/fruit.json')
    .then(response => response.json())
    .then(data => {
      const fruitSelects = document.querySelectorAll('select[id^="fruit"]');

      // Populate the fruit options in the select elements
      data.forEach(fruit => {
        const option = document.createElement('option');
        option.value = fruit.id;
        option.textContent = fruit.name;

        fruitSelects.forEach(select => {
          select.appendChild(option.cloneNode(true));
        });
      });
    })
    .catch(error => {
      console.error('Failed to load fruit data:', error);
    });
});
