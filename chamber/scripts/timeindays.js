if (typeof(Storage) !== "undefined") {
  // Get the current date
  const currentDate = new Date().getTime();

  // Check if the user has visited the site
  if (localStorage.getItem("lastVisit")) {
    // Get the previous visit timestamp from local storage
    const lastVisit = localStorage.getItem("lastVisit");

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate - lastVisit;

    // Convert milliseconds to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Display the days difference on the page
    const daysDiffElement = document.getElementById("daysDiff");
    daysDiffElement.innerHTML = "Days since your last visit: " + daysDiff;
  }

  // Store the current visit timestamp in local storage
  localStorage.setItem("lastVisit", currentDate);
}