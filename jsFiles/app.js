const dateDisplay = document.getElementById("date-display");
const temperature = document.getElementById("temperature");
const feelTemperature = document.getElementById("feels-like");
const humidityDisplay = document.getElementById("humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const countryDisplay = document.getElementById("country");
const city = document.getElementById("city");
const rainVolume = document.getElementById("rain-volume");
const weatherDescription = document.getElementById("weather-description");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const rainIcon = document.getElementById("rain-icon");

// Getting current date and time.
const dateToday = new Date();
const date = `${dateToday.getDate()}/${
  dateToday.getMonth() + 1
}/${dateToday.getFullYear()}`;

// en-US: uses 12-hour time with AM/PM
const time = dateToday.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

dateDisplay.innerHTML = `Today's date: ${date}, time: ${time}`;

// HTML Geolocation API on your browser - no web request!
// gettting location of the user's computer: latitude and longitude
function getLocation(pos) {
  const lat = pos.coords.latitude.toFixed(2);
  const long = pos.coords.longitude.toFixed(2);
  getWeatherData(lat, long);
}

function handleError(error) {
  alertError(error);
}

navigator.geolocation.getCurrentPosition(getLocation, handleError);

// Getting the temperature from the Open Weather API using geographical coordinates.
// Response format is Json by default.
// https://openweathermap.org/current --free

const KEY = "3137461397c70af0e13c77fda97afa11";

function getWeatherData(latitude, longitude) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`;
  //the fetch() method instructs the web browsers to send a request to a URL.
  //less than60 calls/min
  fetch(api)
    .then((response) => response.json())
    // data --> Promise object represents the eventual completion (or failure)
    // of an asynchronous operation and its resulting value.
    // console.log(response);
    .then((data) => {
      console.log("the data is:", data);
      // when the object has key, value pairs, like data.main
      // properties can be store: const {property} = object
      // for easy access, long form: data.main.property
      // it is call destructuring.
      const { temp, feels_like, humidity } = data.main;
      temperature.innerHTML = `${temp.toFixed(1)}°C`;
      feelTemperature.innerHTML = ` ${feels_like}°C`;
      humidityDisplay.innerHTML = ` ${humidity} %`;

      const { sunrise, sunset, country } = data.sys;
      sunriseTime.innerHTML = timeConversion(sunrise);
      sunsetTime.innerHTML = timeConversion(sunset);

      countryDisplay.innerHTML = countryCodeConversion(country);
      city.innerHTML = data.name;
      windSpeed.innerHTML = ` ${(data.wind.speed * 3.6).toFixed(1)}km/h`;

      const { description, icon } = data.weather[0];
      weatherDescription.innerHTML = description;
      weatherIcon.src = getIcon(icon);
      // when the weather is not rainy data.rain doesn't exits
      rainVolume.innerHTML = data.rain ? `${data.rain["1h"]}mm` : "no rain";
      rainIcon.className = data.rain
        ? "fas fa-umbrella"
        : "fas fa-umbrella-beach";
    })
    .catch((error) => {
      alertError(error);
    });
}
function timeConversion(timeStamp) {
  // The multiplication *1000 is because the timeStamp is in second
  // and the Date expects miliseconds
  let timeObj = new Date(timeStamp * 1000);
  return timeObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// handles the alert pop up message for catch and handle error functions
function alertError(error) {
  alert(error.message);
}
