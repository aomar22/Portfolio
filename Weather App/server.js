console.log("server.js is connected!");

const API_KEY = '66b9bad8c9785ec27cacc49487af59f0';

// Function to get local weather
function getLocalWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => displayWeather(data))
                    .catch(() => showError("Error fetching local weather."));
            },
            () => showError("Geolocation permission denied. Please search manually.")
        );
    } else {
        showError("Geolocation is not supported by this browser.");
    }
}

// Function to display weather info
function displayWeather(data) {
    document.getElementById('local-weather').innerHTML = `
        <div class="card">
            <h5 class="card-header">${data.name}, ${data.sys.country}
                <img src="http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png" alt="flag">
            </h5>
            <div class="card-body">
                <h6>Temperature: ${data.main.temp}°C</h6>
                <p>Condition: ${data.weather[0].description}</p>
            </div>
        </div>
    `;
}

// Run local weather fetch when page loads
document.addEventListener('DOMContentLoaded', getLocalWeather);
document.getElementById('search-btn').addEventListener('click', searchCity);
document.getElementById('city-search').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        searchCity();
    }
});
function searchCity() {
    let query = document.getElementById('city-search').value.trim();
    if (!query) {
        showError('Please enter a city name.');
        return;
    }

    query = encodeURIComponent(query); // Handles spaces properly

    fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&cnt=10&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (!data.list || data.list.length === 0) {
                showError('City not found. Please try again.');
            } else {
                fetchedCities = data.list;
                currentPage = 1;
                displaySearchResults(pagination(fetchedCities));
            }
        })
        .catch(() => showError('Error fetching city data.'));
}
function showError(message) {
    document.getElementById('error-message').innerText = message;
}
function displaySearchResults(cities) {
    document.getElementById('error-message').innerText = '';
    document.getElementById('search-results').innerHTML = cities.map(city => `
        <div class="card">
            <h5 class="card-header">${city.name}, ${city.sys.country}
                <img src="http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png" alt="flag">
            </h5>
            <div class="card-body">
                <p>Temperature: ${city.main.temp}°C</p>
                <p>Condition: ${city.weather[0].description}</p>
                <button class="btn btn-info" onclick="viewDetails('${city.id}')">More Info</button>
            </div>
        </div>
    `).join('');
}
let fetchedCities = [];
let currentPage = 1;
const resultsPerPage = 3;

function pagination(data) {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return data.slice(startIndex, startIndex + resultsPerPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displaySearchResults(pagination(fetchedCities));
    }
}

function nextPage() {
    if (currentPage < Math.ceil(fetchedCities.length / resultsPerPage)) {
        currentPage++;
        displaySearchResults(pagination(fetchedCities));
    }
}
function viewDetails(cityId) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('modal-body').innerHTML = `
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Max Temp: ${data.main.temp_max}°C</p>
                <p>Min Temp: ${data.main.temp_min}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            const modal = new bootstrap.Modal(document.getElementById('details-modal'));
            modal.show();
        })
        .catch(() => showError("Failed to fetch city details."));
}
