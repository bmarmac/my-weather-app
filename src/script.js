//Display the current date and time using JavaScript: Tuesday 16:00.
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0{currentHour}`;
}

let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let timeStamp = document.querySelector(".current-time");
timeStamp.innerHTML = `${weekDay}, ${currentHour}:${currentMinute}`;

//Display the city name and real temperature on the page after the user submits the form
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureHolder = document.querySelector(".temp-integer");
  temperatureHolder.innerHTML = `${temperature}`;
} 

function displayCity(event) {
  event.preventDefault();
  let apiKey = "964955e5f35e95e076886d1bc19a6c34";
  let units = "metric";
  let cityInput = document.querySelector("#city-input");
  let cityHolder = document.querySelector(".current-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  cityHolder.innerHTML = `${cityInput.value}`;
}


let searchCity = document.querySelector("#search-engine");
searchCity.addEventListener("submit", displayCity);


// Use the Geolocation API to get your GPS coordinates by clicking on the button "my current location"

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureHolder = document.querySelector(".temp-integer");
  let cityHolder = document.querySelector(".current-city");
  temperatureHolder.innerHTML = `${temperature}`;
  cityHolder.innerHTML = `${response.data.name}`;
}


function retrievePosition(position) {
  let apiKey = "964955e5f35e95e076886d1bc19a6c34";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function searchLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", searchLocation);