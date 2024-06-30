const mosumifyInputBox = document.querySelector('.input-box');
const mosumifySearchBtn = document.getElementById('mosumifySearchBtn');
const mosumifyImg = document.querySelector('.weather-img');
const mosumifyTemperature = document.querySelector('.mosumifyTemperature');
const mosumifyDescription = document.querySelector('.mosumifyDescription');
const mosumifyHumidity = document.getElementById('mosumifyHumidity');
const mosumifyWindSpeed = document.getElementById('mosumifyWindSpeed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "d27cf763d8a617026b25280fb179fc42";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    mosumifyTemperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    mosumifyDescription.innerHTML = `${weather_data.weather[0].description}`;

    mosumifyHumidity.innerHTML = `${weather_data.main.humidity}%`;
    mosumifyWindSpeed.innerHTML = `${weather_data.wind.speed}m/s`;

    if (weather_data.weather[0].main === 'Clouds') {
        mosumifyImg.src = "./public/images/cloud.png";
    } else if (weather_data.weather[0].main === 'Clear') {
        mosumifyImg.src = "./public/images/clear.png";
    } else if (weather_data.weather[0].main === 'Rain') {
        mosumifyImg.src = "./public/images/rain.png";
    } else if (weather_data.weather[0].main === 'Mist') {
        mosumifyImg.src = "./public/images/mist.png";
    } else if (weather_data.weather[0].main === 'Snow') {
        mosumifyImg.src = "./public/images/snow.png";
    }
    console.log(weather_data);
}


mosumifySearchBtn.addEventListener('click', ()=>{
    checkWeather(mosumifyInputBox.value);
});