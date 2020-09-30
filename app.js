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

function timeConversion(timeStamp) {
  let timeObj = new Date(timeStamp * 1000);
  return timeObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Getting current date and time.
const dateToday = new Date();
const date = `${dateToday.getDate()}/${
  dateToday.getMonth() + 1
}/${dateToday.getFullYear()}`;

// en-US: uses 12-hour time with AM/PM
const time = timeConversion(dateToday);

dateDisplay.innerHTML = `Today's date: ${date}, time: ${time}`;

// HTML Geolocation API on your browser - no web request!
// gettting location of the user's computer: latitude and longitude
function getLocation(pos) {
  const lat = pos.coords.latitude.toFixed(2);
  const long = pos.coords.longitude.toFixed(2);
  getTemperature(lat, long);
}

function handleError(error) {
  alert(`Your position could not be found, error: ${error.message}`);
  console.warn(`Error displaying position, error: ${error.code}`);
}

navigator.geolocation.getCurrentPosition(getLocation, handleError);

// Getting the temperature from the Open Weather API using geographical coordinates.
// Response format is Json by default.
// https://openweathermap.org/current --free

const KEY = "3137461397c70af0e13c77fda97afa11";

function getTemperature(latitude, longitude) {
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
      
      countryDisplay.innerHTML = country;
      city.innerHTML = data.name;
      windSpeed.innerHTML = ` ${(data.wind.speed * 3.6).toFixed(1)}km/h`;
      weatherDescription.innerHTML = data.weather[0].description;
      // when the weather is not rainy data.rain doesn't exits 
      if (data.rain) {
        rainVolume.innerHTML = data.rain.rain["1h"];
      } else {
        rainVolume.innerHTML = "no rain";
      }
    })
    .catch((error) => {
      // handles errors
      console.warn(`error: ${error.message}, weather API`);
    });
}

