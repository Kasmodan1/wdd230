document.addEventListener('DOMContentLoaded', function () {

  // Weather API Key (Replace with your actual API key)
  const apiKey = '4c54fca158b42e311af4648c4552b37c';
  const locationData = {
    lat: 33.1581,
    lon: -117.3506,
  };

  // Function to process forecast data and extract highest and lowest temperatures for each day
  function processForecastData(forecastData) {
    const dailyForecast = {};

    // Loop through the forecast data and extract highest and lowest temperatures for each day
    for (const forecast of forecastData) {
      const forecastDate = new Date(forecast.dt * 1000);
      const day = forecastDate.toDateString(); // Use the date string as the key to group data by day

      if (!(day in dailyForecast)) {
        dailyForecast[day] = {
          minTemp: forecast.main.temp_min,
          maxTemp: forecast.main.temp_max,
        };
      } else {
        const currentMinTemp = forecast.main.temp_min;
        const currentMaxTemp = forecast.main.temp_max;

        dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, currentMinTemp);
        dailyForecast[day].maxTemp = Math.max(dailyForecast[day].maxTemp, currentMaxTemp);
      }
    }

    return dailyForecast;
  }

  // Function to display three-day forecast
  function displayForecast(forecastData) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = ''; // Clear previous forecast data
  
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    // Filter out forecast data for the next three days
    const now = new Date();
    const nextThreeDays = [now, new Date(now.getTime() + 24 * 60 * 60 * 1000), new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)];
    const filteredForecastData = forecastData.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return nextThreeDays.some((day) => day.toDateString() === forecastDate.toDateString());
    });
  
    // Process filtered forecast data to get daily min and max temperatures
    const dailyForecast = processForecastData(filteredForecastData);
  
    for (const day in dailyForecast) {
      const { minTemp, maxTemp } = dailyForecast[day];
      const forecastDate = new Date(day);
      const dayIndex = forecastDate.getDay(); // Get the day index (0 to 6)
      const dayName = weekdays[dayIndex]; // Get the short weekday name using the index
  
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
      forecastItem.innerHTML = `
        <p>${dayName}</p>
        <p>Low: ${minTemp.toFixed(1)}°F</p>
        <p>High: ${maxTemp.toFixed(1)}°F</p>
      `;
      forecastElement.appendChild(forecastItem);
    }
  }

  // Function to display current weather
  function displayCurrentWeather(currentWeatherData) {
    const currentWeatherElement = document.getElementById('current-weather');
    //console.log('Current Weather Data:', currentWeatherData);

    const temperature = currentWeatherData.main.temp;
    const condition = currentWeatherData.weather[0].description;
    const humidity = currentWeatherData.main.humidity;

    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const humidityElement = document.getElementById('humidity');

    temperatureElement.textContent = `${temperature.toFixed(1)}°F`;
    conditionElement.textContent = condition;
    humidityElement.textContent = `${humidity}%`;
  }

  // Async function to fetch weather data and display
  async function fetchAndDisplayWeather() {
    try {
      // Fetch current weather data in imperial units (Fahrenheit)
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`);
      const currentWeatherData = await currentWeatherResponse.json();

      console.log('Forecast Data:', currentWeatherData); // Add this line to log

      // Fetch 5-day forecast data in imperial units (Fahrenheit)
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`);
      const forecastData = await forecastResponse.json();

      console.log('Forecast Data:', forecastData); // Add this line to log

      // Display current weather
      displayCurrentWeather(currentWeatherData);

      // Display three-day forecast
      displayForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // Call the async function to fetch and display weather data
  fetchAndDisplayWeather();

});
