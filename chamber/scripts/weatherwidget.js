// Check if window.myWidgetParam exists, if not, create an empty array
window.myWidgetParam = window.myWidgetParam ? window.myWidgetParam : [];

// Push an object with weather widget configuration into the myWidgetParam array
window.myWidgetParam.push({
  id: 15,
  cityid: '5729080',   // Replace this with your desired city ID
  appid: '4c54fca158b42e311af4648c4552b37c',   // Replace this with your OpenWeatherMap API key
  units: 'imperial',   // Units for the weather data ('imperial' for Fahrenheit, 'metric' for Celsius)
  containerid: 'openweathermap-widget-15',   // Replace this with the ID of the HTML element where you want to embed the weather widget
});

// Anonymous function that loads the weather widget script asynchronously
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.charset = "utf-8";
  script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
})();