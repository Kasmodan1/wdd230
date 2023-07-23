document.addEventListener('DOMContentLoaded', function () {
	document.cookie = "your_cookie_name=your_cookie_value; samesite=none; secure";
	// Weather API Key (Replace with your actual API key)
	const apiKey = '4c54fca158b42e311af4648c4552b37c';
	const locationData = {lat: 42.43, lon: -123.30};
	//console.log ('Location Data"', locationData);

	// Calculate the wind chill using the formula for temperatures in Fahrenheit.
	function calculateWindChillFactor(temperature, windSpeed){
		return 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
	}
	
	function calculateWindChill(temperature, windSpeed) {
		// Check if input values meet the specification limits
		if (temperature <= 50 && windSpeed > 3.0) {
		  // Calculate wind chill factor
		  const windChill = calculateWindChillFactor(temperature, windSpeed);
		  console.log('Wind Chill', windChill)
		  document.getElementById("windChill").textContent = `${windChill.toFixed(2)} °F`;
		} else {
		  // Display "N/A" for wind chill
		  document.getElementById("windChill").textContent = "N/A";
		  console.log('Wind Chill', windChill)
		}
	}
	  
	// Function to display current weather
	function displayCurrentWeather(currentWeatherData) {;
		const currentWeatherElement = document.getElementById('current-weather');

		//console.log('Current Weather Data:', currentWeatherData);

		const temperature = currentWeatherData.main.temp;
		const condition = currentWeatherData.weather[0].description;
		const humidity = currentWeatherData.main.humidity;
		const windSpeed = currentWeatherData.wind.speed;
		const windChill = calculateWindChill(temperature, windSpeed);
		const weatherIcon = currentWeatherData.weather[0].icon; // Icon code provided by the API

		// Get the URL for the weather icon
		const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

		const temperatureElement = document.getElementById('temperature');
		const conditionElement = document.getElementById('condition');
		const humidityElement = document.getElementById('humidity');
		const windSpeedElement = document.getElementById('windSpeed'); 
		const windChillElement = document.getElementById('windChill'); 
		const weatherIconElement = document.getElementById('weather-icon'); // Element for the weather icon

		temperatureElement.textContent = `${temperature.toFixed(0)}°F`;
		conditionElement.textContent = condition;
		humidityElement.textContent = `${humidity}%`;
		windSpeedElement.textContent = windSpeed;

		// Set the weather icon
		weatherIconElement.setAttribute('src', weatherIconUrl);
		weatherIconElement.setAttribute('alt', condition); // Use the weather description as the alt text for the icon
	
	}
	
	// Async function to fetch weather data and display
	async function fetchAndDisplayWeather() {
		try {
		// Fetch current weather data in imperial units (Fahrenheit)
		const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`);
		const currentWeatherData = await currentWeatherResponse.json();

		//console.log('Forecast Data:', currentWeatherData); // Add this line to log

		// Display current weather
		displayCurrentWeather(currentWeatherData);
  
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	}
	fetchAndDisplayWeather();
});