function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector ("#icon");

    

iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`
timeElement.innerHTML = formatDate(date);    
cityElement.innerHTML = response.data.city;
windElement.innerHTML = `${response.data.wind.speed}km/h`;
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
descriptionElement.innerHTML = response.data.condition.description;
temperatureElement.innerHTML = Math.round(temperature);

getForecast(response.data.city);
}

function formatDate(date) {
  
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

     return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey = "53f2071330t4ac47ab120653c94o340f";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(refreshWeather);

}







function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

searchCity(searchInput.value);
}

function getForecast(city){
    let apiKey ="53f2071330t4ac47ab120653c94o340f";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);

}





function displayForecast (response){
   
    

let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
let forecastHtml = "";


    days.forEach(function (day) {
        forecastHtml = 
        forecastHtml +

    `
    <div class="weather-forecast-day"> 
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon"> 🌞</div>
    <div class="weather-forecast-temperatures"> 
    <div class="weather-forecast-temperature"><strong>10 &deg;C</strong></div>
    <div class="weather-forecast-temperature">9&deg;C</div>
     </div> 
     </div>
    `;
    }) ;

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml
}






let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Mielec");


