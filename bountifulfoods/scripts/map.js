// map.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the map
  const map = L.map('map-container').setView([33.158093, -117.350594], 13);

  // Add the tile layer (OpenStreetMap) to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker at the location of Bountiful Foods
  const marker = L.marker([33.158093, -117.350594]).addTo(map);

  // Set a popup for the marker
  marker.bindPopup("<b>Bountiful Foods</b><br>123 Main Street, Carlsbad, CA").openPopup();
});
