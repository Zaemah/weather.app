function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
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

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#currentTemperature");
    let temperature = Math.round(response.data.temperature.current);

    temperatureElement.innerHTML = `${temperature}°C`;
  }

  let apiKey = "9f643d37e7b4384t68a91494fb6ocd10";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);
