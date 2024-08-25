// JavaScript to handle weather forecast app

async function fetchWeatherData(location) {
    const apiKey = '65488db48fff5308c4608e17d2d34395';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            updateCurrentWeather(data);
            fetchForecastData(data.coord.lat, data.coord.lon);
        } else {
            alert('Location not found. Please enter a valid location.');
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again later.');
        console.error(error);
    }
}

// Function to fetch weather forecast data from OpenWeatherMap API
async function fetchForecastData(lat, lon) {
    const apiKey = '65488db48fff5308c4608e17d2d34395'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            updateWeatherForecast(data);
        } else {
            alert('Error fetching forecast data.');
        }
    } catch (error) {
        alert('Error fetching forecast data. Please try again later.');
        console.error(error);
    }
}

// Function to update the current weather section
function updateCurrentWeather(data) {
    const currentTemp = document.getElementById('currentTemp');
    const currentCondition = document.getElementById('currentCondition');
    const currentHumidity = document.getElementById('currentHumidity');
    const currentWind = document.getElementById('currentWind');

    currentTemp.textContent = `Temperature: ${data.main.temp}°C`;
    currentCondition.textContent = `Condition: ${data.weather[0].description}`;
    currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    currentWind.textContent = `Wind Speed: ${data.wind.speed} km/h`;
}

// Function to update the weather forecast section
function updateWeatherForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; 

        for (let i = 0; i < data.list.length; i += 8) { 
        const forecast = data.list[i];
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        const temp = forecast.main.temp;
        const condition = forecast.weather[0].description;

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
        forecastDay.innerHTML = `
            <p>${date}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${condition}</p>
        `;

        forecastContainer.appendChild(forecastDay);
    }
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    if (locationInput) {
        fetchWeatherData(locationInput);
    } else {
        alert('Please enter a location.');
    }
});
