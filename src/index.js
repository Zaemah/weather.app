function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let dayName = weekDays[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let day = date.getDate();

  return `${month}, ${day} ${dayName}, ${year}`;
}

function formatHour(hour) {
  let hours = hour.getHours();
  let minutes = hour.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let currentDay = document.querySelector("#current-date");
let currentHour = document.querySelector("#current-time");

let currentTime = new Date();

currentDay.innerHTML = formatDate(currentTime);
currentHour.innerHTML = formatHour(currentTime);

function searchCity(city){
  let apiKey = "9f643d37e7b4384t68a91494fb6ocd10";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
  
}


function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

  function displayTemperature(response) {
    let cityElement= document.querySelector('#city');
    let temperatureElement = document.querySelector("#currentTemperature");
    let temperature = Math.round(response.data.temperature.current);
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let feelElement=document.querySelector("#realFeel");
    let feel= Math.round(response.data.temperature.feels_like);
    let speedElement=document.querySelector("#windSpeed");
    let speed=Math.round(response.data.wind.speed);
    let degreeElement=document.querySelector("#windDegree");
    let iconElement=document.querySelector("#currentIcon");


    cityElement.innerHTML= response.data.city;
    temperatureElement.innerHTML =`${temperature}°C`;
    descriptionElement.innerHTML= response.data.condition.description;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    feelElement.innerHTML=`${feel}°C`;
    speedElement.innerHTML=`${speed}km/hr`;
    degreeElement.innerHTML=`${response.data.wind.degree}°`;
    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}"class="weather-icon">`;
  }

  
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", showCity);

  searchCity("Bulawayo");
