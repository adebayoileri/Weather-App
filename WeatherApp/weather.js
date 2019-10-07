class Weather{
    constructor(city) {
        this.city = city;
        this.APIKEY = 'fb2f373a1b55e3ef1b456a77f399c63b';
    }
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKEY}`);
        const data = await response.json();
        return data;
    }
    changeLocation(city) {
        this.city = city;
    }
}
class UI{
    constructor(){
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc-info');
        this.temp = document.getElementById('w-temp-info');
        this.time = document.getElementById('w-time');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.dewpoint = document.getElementById('w-dew-point');
        this.feels = document.getElementById('w-feels');
        this.wind = document.getElementById('w-wind-speed');
    }
    paint(weather){
        this.location.textContent =`${weather.name} ,${weather.sys.country}`;
        this.desc.textContent = `${weather.weather[0].description}`;
        this.wind.textContent =`Wind Speed : ${weather.wind.speed*3.6}km/hr`;
        this.humidity.textContent =`Relative Humidity :${weather.main.humidity}%`;
        this.feels.textContent =`Pressure: ${weather.main.pressure}hPa`;
        this.dewpoint.textContent =`Temperature ranges from ${weather.main.temp_min - 273.15}°C
        to ${weather.main.temp_max - 273.15}°C
        `; 
        this.time.textContent = new Date().toDateString();
        this.temp.textContent = `${weather.main.temp}K (${weather.main.temp - 273.15}°C) `
        this.icon.setAttribute('class',weather.weather[0].icon);
    }
}
// Initialized Class Weather
const weather =new Weather('Lagos');

const ui = new UI();

//Get Default Weather
const getWeather = () => weather.getWeather()
    .then( results =>{
        ui.paint(results);
    })
    .catch( err =>{
        console.log(err);
    });

    window.addEventListener('DOMContentLoaded',getWeather);