function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now= date.getDate();
  let day = days[date.getDay()];
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
    "December",
  ];
  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${now} ${month}, ${hours}:${minutes}`;
}

function getForecast(city){
  let apiKey="9f643d37e7b4384t68a91494fb6ocd10";
  let apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`; 

  
  axios.get(apiUrl).then(displayForecast);
 }

   function formatDay(focastTime){
    let date= new Date(focastTime * 1000);
    let days=["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    return days[date.getDay()];
   }

  function displayForecast(response){
    console.log(response.data);
 
  
  let forecastHtml="";

  response.data.daily.forEach(function(day,index){
    if(index<6){
    forecastHtml=
    forecastHtml +

  `<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <img src ="${day.condition.icon_url}" class="weather-forecast-icon"/>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum)}°</strong>
    </div>
    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
  </div>
</div>
`;
    }
 });

  let forecastElement = document.querySelector("#daily-forecast");
      forecastElement.innerHTML = forecastHtml;

 }
 
 

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
    let timeElement = document.querySelector("#date");
    let date = new Date(response.data.time * 1000);


    cityElement.innerHTML= response.data.city;
    temperatureElement.innerHTML =`${temperature}°C`;
    descriptionElement.innerHTML= response.data.condition.description;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    feelElement.innerHTML=`${feel}°C`;
    speedElement.innerHTML=`${speed}km/hr`;
    degreeElement.innerHTML=`${response.data.wind.degree}°`;
    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}"class="weather-icon">`;
    timeElement.innerHTML = formatDate(date);
  
    getForecast(response.data.city);
  
  }

    
  

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", showCity);

  searchCity("Bulawayo");
  
