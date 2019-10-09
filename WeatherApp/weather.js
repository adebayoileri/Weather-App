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
        this.humidity = document.getElementById('w-humidity');
        this.dewpoint = document.getElementById('w-dew-point');
        this.feels = document.getElementById('w-feels');
        this.wind = document.getElementById('w-wind-speed');
    }
    paint(weather){
        this.location.textContent =`${weather.name} ,${weather.sys.country}`;
        this.desc.textContent = `${weather.weather[0].main}`;
        this.wind.textContent =`Wind Speed : ${Math.floor(weather.wind.speed*3.6)} km/hr`;
        this.humidity.textContent =`Relative Humidity :${weather.main.humidity}%`;
        this.feels.textContent =`Pressure: ${weather.main.pressure}hPa`;
        this.dewpoint.textContent =`Temperature ranges from ${Math.floor(weather.main.temp_min - 273.15)}°C
        to ${Math.floor(weather.main.temp_max - 273.15)}°C
        `; 
        this.time.textContent = new Date().toDateString();
        this.temp.textContent = `${weather.main.temp}K (${Math.floor(weather.main.temp - 273.15)}°C) `
    }
}

class Storage{
    constructor(){
    this.city;
    this.defaultCity = 'Lagos';    
    }

    getLocationData(){
        if(localStorage.getItem('city') === null){
            this.city = this.defaultCity;
        }else{
            this.city =localStorage.getItem('city');
        }
        return{
            city:this.city
        }
    }
    setLocationData(city){
        localStorage.setItem('city',city);
    }

}
// Initialized Class Weather
const storage =new Storage();
const weatherLocation = storage.getLocationData();

const weather =new Weather(weatherLocation.city);

const ui =new UI();

//Get Default Weather
const getWeather = () => weather.getWeather()
    .then( results =>{
        ui.paint(results);
    })
    .catch( err =>{
        console.log(err);
    });

    window.addEventListener('DOMContentLoaded',getWeather());

    // Change Location
    document.getElementById('change-weather').addEventListener('click',(e) => {
        e.preventDefault();
        const city = document.getElementById('w-city').value
        weather.changeLocation(city);
        storage.setLocationData(city);
        getWeather();
        const modal = document.getElementById('location-modal');
        modal.style.display ="none"
    });
    