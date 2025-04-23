const apiKey = 'd2466b27b85294d289435cc79cc1853b'; // OpenWeatherMap API key
const searchButton = document.getElementById('search');

searchButton.addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found!');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
    }
}

// Map OpenWeatherMap icon codes to Weather Icons classes
function getWeatherIconClass(icon) {
    switch(icon) {
        case '01d': return 'wi-day-sunny';
        case '01n': return 'wi-night-clear';
        case '02d': return 'wi-day-cloudy';
        case '02n': return 'wi-night-alt-cloudy';
        case '03d':
        case '03n': return 'wi-cloud';
        case '04d':
        case '04n': return 'wi-cloudy';
        case '09d':
        case '09n': return 'wi-showers';
        case '10d': return 'wi-day-rain';
        case '10n': return 'wi-night-alt-rain';
        case '11d':
        case '11n': return 'wi-thunderstorm';
        case '13d':
        case '13n': return 'wi-snow';
        case '50d':
        case '50n': return 'wi-fog';
        default: return 'wi-na';
    }
}

function displayWeather(data) {
    const iconClass = getWeatherIconClass(data.weather[0].icon);
    const weatherInfo = `
        <h2>${data.name}</h2>
        <i class="wi ${iconClass}" style="font-size: 4rem; color: #000000;"></i>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}