// Get the current day of the week
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  // Check if it's Monday (1) or Tuesday (2)
  if (currentDay === 1 || currentDay === 2) {
    // Display the banner
    const bannerElement = document.getElementById("banner");
    bannerElement.innerHTML =
      '🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.';
    bannerElement.style.display = "block";
  }
