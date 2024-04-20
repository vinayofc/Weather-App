const apiKey = 'ecd0dbf76b95f54e28f9723262eebdc1'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeatherData(cityName) {
    const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

function updateWeatherUI(data) {
    const cityElement = document.querySelector('.city');
    const dateElement = document.querySelector('.date');
    const tempElement = document.querySelector('.temp');
    const descriptionTextElement = document.querySelector('.description-text');
    const humidityElement = document.querySelector('.humidity');
    const windSpeedElement = document.querySelector('.wind-speed');
    const visibilityElement = document.querySelector('.visibility-distance');

    cityElement.textContent = data.name;
    dateElement.textContent = new Date(data.dt * 1000).toLocaleDateString();
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionTextElement.textContent = data.weather[0].description;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} m/s`;
    visibilityElement.textContent = `${data.visibility / 1000} km`;
}


function handleFormSubmit(event) {
    event.preventDefault();
    const cityName = document.querySelector('.city-input').value.trim();
    if (cityName) {
        fetchWeatherData(cityName)
            .then(data => updateWeatherUI(data))
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        console.error('Please enter a city name');
    }
}

document.querySelector('.search-form').addEventListener('submit', handleFormSubmit);
