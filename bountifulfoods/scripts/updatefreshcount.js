// Function to update the information card
function updateInfoCard() {
  const submittedData = JSON.parse(localStorage.getItem('submittedData')) || [];
  const drinkCount = submittedData.length;

  //console.log('json info', submittedData)
  //console.log('Data', drinkCount)

  const drinkCountElement = document.getElementById('drink-count');
  drinkCountElement.textContent = drinkCount.toString();
}

// Update the information card when the page is loaded
document.addEventListener('DOMContentLoaded', updateInfoCard);



//function updateInfoCard() {
//  const submittedData = JSON.parse(localStorage.getItem('submittedData')) || [];
//  const drinkCount = submittedData.length;
//
//  console.log('json info', submittedData)
//  console.log('Data', drinkCount)
//
//
//  const drinkCountElement = document.getElementById('drink-count');
//  drinkCountElement.textContent = drinkCount.toString();
//}
//
//// Update the information card when the page is loaded
//document.addEventListener('DOMContentLoaded', () => {
//  updateInfoCard();
//});


//function updateInfoCard() {
//  const submittedData = JSON.parse(localStorage.getItem('submittedData')) || {}; // Change from [] to {}
//  const drinkCount = Object.keys(submittedData).length; // Change from submittedData.length
//
//  console.log('json info', submittedData);
//  console.log('Data', drinkCount);
//
//  const drinkCountElement = document.getElementById('drink-count');
//  drinkCountElement.textContent = drinkCount.toString();
//}
//
//// Update the information card when the page is loaded
//document.addEventListener('DOMContentLoaded', () => {
//  updateInfoCard();
//});