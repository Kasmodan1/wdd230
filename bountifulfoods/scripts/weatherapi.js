document.addEventListener('DOMContentLoaded', function () {
  // Weather API Key (Replace with your actual API key)
  const apiKey = '4c54fca158b42e311af4648c4552b37c';
  const locationData = {
    lat: 33.1581,
    lon: -117.3506,
  };

  // Function to filter forecast data for a specific day
  function filterForecastDataForDay(forecastData, targetDate) {
    console.log('Filtering forecast data for:', targetDate);
    return forecastData.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt);
        console.log('Checking forecastDate:', forecastDate);
      
        const forecastDateWithoutTime = new Date(
            forecastDate.getFullYear(),
            forecastDate.getMonth(),
            forecastDate.getDate()
        );

        console.log('Checking forecast date without time:', forecastDateWithoutTime);

        const targetDateWithoutTime = new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate()
        );
        
        return forecastDateWithoutTime.getTime() === targetDateWithoutTime.getTime();
    });
  }

  // Function to process forecast data and extract highest and lowest temperatures for each day
  function processForecastData(forecastData) {
    let minTemp = Infinity;
    let maxTemp = -Infinity;
    let conditionCode;

    for (let dataPoint of forecastData.list) {
        const { main, weather } = dataPoint;

        minTemp = Math.min(minTemp, main.temp_min);
        maxTemp = Math.max(maxTemp, main.temp_max);

        console.log('Weather data:', weather); // Log weather data

        if (weather && weather.length > 0) {
          conditionCode = weather[0].icon; // Extracting icon code instead of id
      }
    }

    return { minTemp, maxTemp, conditionCode };
}

  // Function to display three-day forecast
  function displayForecast(forecastData) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = ''; // Clear previous forecast data

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();

    // Display forecast for the next three days
    for (let i = 1; i < 4; i++) {
        const targetDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
        const filteredForecastData = filterForecastDataForDay(forecastData, targetDate);

        console.log('Target Date:', targetDate);
        console.log('Filtered Data:', filteredForecastData);

        if (filteredForecastData.length > 0) {
            const { minTemp, maxTemp, conditionCode } = processForecastData({ list: filteredForecastData });

            console.log('Forecast:', targetDate, filteredForecastData[0].dt_txt);

            const dayIndex = targetDate.getDay();
            const dayName = weekdays[dayIndex];

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
              <p>${dayName}</p>
              <i class="${getWeatherIcon(conditionCode)}"></i>
              <p>Low: ${minTemp.toFixed(1)}°F</p>
              <p>High: ${maxTemp.toFixed(1)}°F</p>
            `;
            forecastElement.appendChild(forecastItem);
        }
    }
}

  // Function to display current weather
  function displayCurrentWeather(currentWeatherData) {
    const currentWeatherElement = document.getElementById('current-weather');

    const temperature = currentWeatherData.main.temp;
    const condition = currentWeatherData.weather[0].description;
    const humidity = currentWeatherData.main.humidity;

    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const humidityElement = document.getElementById('humidity');
    const weatherIconElement = document.getElementById('weather-icon');

    // Use the condition code to map to a Font Awesome icon
    const conditionCode = currentWeatherData.weather[0].icon;
    const weatherIconClass = getWeatherIcon(conditionCode);

    temperatureElement.textContent = `${temperature.toFixed(1)}°F`;
    conditionElement.textContent = condition;
    humidityElement.textContent = `${humidity}%`;
    weatherIconElement.className = weatherIconClass;
  }

  function getWeatherIcon(conditionCode) {
    // Map condition code to Font Awesome icons (Replace with your mappings)
    if (conditionCode === '01d') {
      return 'fas fa-sun'; // Clear sky (day)
    } else if (conditionCode === '01n') {
      return 'fas fa-moon'; // Clear sky (night)
    } else if (conditionCode === '02d') {
      return 'fas fa-cloud-sun'; // Few clouds (day)
    } else if (conditionCode === '02n') {
      return 'fas fa-cloud-moon'; // Few clouds (night)
    } else if (conditionCode.startsWith('03') || conditionCode.startsWith('04')) {
      return 'fas fa-cloud'; // Scattered or broken clouds
    } else if (conditionCode.startsWith('09') || conditionCode.startsWith('10')) {
      return 'fas fa-cloud-rain'; // Rain showers
    } else if (conditionCode.startsWith('11')) {
      return 'fas fa-bolt'; // Thunderstorm
    } else if (conditionCode.startsWith('13')) {
      return 'fas fa-snowflake'; // Snow
    } else if (conditionCode.startsWith('50')) {
      return 'fas fa-smog'; // Mist or fog
    } else {
      return 'fas fa-question'; // Unknown or other conditions
    }
  }

  // Async function to fetch weather data and display
  async function fetchAndDisplayWeather() {
    try {
      // Fetch current weather data in imperial units (Fahrenheit)
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      console.log('Current Weather Data:', currentWeatherData);

      // Fetch 5-day forecast data in imperial units (Fahrenheit)
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=imperial`
      );
      const forecastData = await forecastResponse.json();

      console.log('Full Forecast Data:', forecastData);

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
