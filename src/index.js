let apiKey = "8ef314fc1dd32cfe9282343fc0d6b73d";
let apiWeather = `https://api.openweathermap.org/data/2.5/weather?`;

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }
  let dayIndex = date.getDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[dayIndex];
  let formattedDate = `${weekDay} ${hours}:${minutes}`;
  return formattedDate;
}
function farmatMonthDay(date) {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0".concat(month);
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0".concat(day);
  }
  let farmatedMonthDay = `${month}.${day}`;
  return farmatedMonthDay;
}

function showWeather(response) {
  let enterCity = response.data.name;
  let correntCityElement = document.querySelector("#city");
  correntCityElement.innerHTML = enterCity;

  let temperatureCelsius = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = temperatureCelsius;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;

  let cloudin = response.data.weather[0].main;
  let cloudinElemetn = document.querySelector("#cloudin");
  cloudinElemetn.innerHTML = cloudin;

  let icon = response.data.weather[0].icon;
  document
    .querySelector("#weatherIcon")
    .setAttribute("src", `images/icons/${icon}.png`);
}

function searchCity(inputCity) {
  let units = "metric";
  let apiUrl = `${apiWeather}q=${inputCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showData(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city").value;
  searchCity(inputCity);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiUrlPosition = `${apiWeather}lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlPosition).then(showWeather);
}

function showCurrenLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function convertFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temperatureElement = document.querySelector("#today-temperature");
  console.log(temperatureElement);
  let temperatureF = (temperatureCelsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureF);
}

function convertCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(temperatureCelsius);
}

let todayWeekDay = document.querySelector("#today-week-day");
let today = new Date();
todayWeekDay.innerHTML = formatDate(today);

let todayMonthDay = document.querySelector("#today-month-day");
todayMonthDay.innerHTML = farmatMonthDay(today);

searchCity("Kyiv");
var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showData);

let buttonCurrentCity = document.querySelector("#buttonCurrentLocation");
buttonCurrentCity.addEventListener("click", showCurrenLocation);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);
