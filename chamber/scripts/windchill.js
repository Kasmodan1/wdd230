// windchill.js

// Function to calculate wind chill factor
function calculateWindChill() {
  // Get temperature and wind speed values from the <span> tags
  const temperature = parseFloat(document.getElementById("temperatureValue").textContent);
  const windSpeed = parseFloat(document.getElementById("windSpeedValue").textContent);
  
  // Check if input values meet the specification limits
  if (temperature <= 50 && windSpeed > 3.0) {
    // Calculate wind chill factor
    const windChill = calculateWindChillFactor(temperature, windSpeed);
    document.getElementById("windChillResult").textContent = `Wind Chill Factor: ${windChill.toFixed(2)} °F`;
  } else {
    document.getElementById("windChillResult").textContent = "N/A";
  }
}

// Function to calculate wind chill factor
function calculateWindChillFactor(temperature, windSpeed) {
  const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
  return windChill;
}

// Simulated function to fetch data from the API
function fetchDataFromAPI() {
  // Replace this with your actual API call logic
  // Return a Promise that resolves with the fetched data
  return new Promise((resolve, reject) => {
    // Simulating API response
    const data = {
      temperature: 40.5,
      windSpeed: 5.8
    };
    
    setTimeout(() => {
      resolve(data);
    }, 1000); // Simulating a delay of 1 second
  });
}

// Fetch temperature and wind speed values from the API
fetchDataFromAPI().then(data => {
  document.getElementById("temperatureValue").textContent = data.temperature;
  document.getElementById("windSpeedValue").textContent = data.windSpeed;

  // Calculate wind chill
  calculateWindChill();
}).catch(error => {
  console.error(error);
});
