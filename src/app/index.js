class Weather{
    constructor(city, countryCode){
        this.city = city;
        this.countryCode = countryCode;
        this.apiKey = 'f5a15eeb7efbf3e6ba2cbe3bf93ad5c0';
    }

    async getWeather(){
        const URI = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(URI);
        const data = await response.json();
        return data;
    }

    changeLocation(city, countryCode){
        this.city = city;
        this.countryCode = countryCode;
    }
};

class UI {
    constructor(){
        this.location = document.getElementById('weather-location');
        this.desc = document.getElementById('weather-description');
        this.string = document.getElementById('weather-string');
        this.humidity = document.getElementById('weather-humidity');
        this.wind = document.getElementById('weather-wind');
    }

    render(weather){
        console.log(weather);
        this.location.textContent = weather.name + ' / ' + weather.sys.country;
        this.desc.textContent = weather.weather[0]['description'];
        this.string.textContent = weather.main.temp + ' °C';
        this.humidity.textContent = 'Humidity: ' + weather.main.humidity + '°C';
        this.wind.textContent = 'Weather ' + weather.wind.speed + ' m/s';
    }
};

const weather = new Weather(city, countryCode);
const ui = new UI();

async function fetchWeather(){
    const data = await weather.getWeather();
    ui.render(data);
};

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value;

    weather.changeLocation(city, countryCode);
    fetchWeather();
});

document.addEventListener('DOMContentLoaded', fetchWeather);

