const localDateTimeElement = document.getElementById("local-date-display");
const searchLocationTimeElement = document.getElementById(
  "search-location-time"
);
const temperature = document.getElementById("temperature");
const feelTemperature = document.getElementById("feels-like");
const humidityElement = document.getElementById("humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const countryElement = document.getElementById("country");
const city = document.getElementById("city");
const rainVolume = document.getElementById("rain-volume");
const weatherDescription = document.getElementById("weather-description");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const rainIcon = document.getElementById("rain-icon");

// constants for card design (used in skyColor())
const cardBody = document.querySelector(".card-body");
const card = document.querySelector(".card");
const cardHeader = document.querySelector(".card-header");
const cardHeading = document.querySelector("h1");
const cardFooter = document.querySelector(".card-footer");
const imageHouse = document.querySelector("#house-img");

const form = document.querySelector("#city-search-form");
const inputElement = document.querySelector("#city-input");

const apiRootUrl = "https://api.openweathermap.org/data/2.5/";
const KEY = "3137461397c70af0e13c77fda97afa11";

// ------- DISPLAYING CURRENT DATE AND TIME AT USER'S LOCATION--------------------
const currentDateUserLocation = new Date();
dateTimeDisplay(currentDateUserLocation);

// --------DISPLAYING THE WEATHER IN USER'S LOCATION------------------------------
// HTML Geolocation API from the browser - no web request!
navigator.geolocation.getCurrentPosition(
  displayWeatherUserLocation,
  handleErrorGeo
);

// -----------DISPLAYING THE WEATHER IN CITY SEARCHED------------------------------
form.addEventListener("submit", search);
// submit event works by pressing the button or pressing enter after making an input!

//------------FETCHING WEATHER DATA FROM OPEN WEATHER API---------------------------
/**
 * @param {string} apiUrl - url
 * @param {boolean} searchCity - default value is false, true when the fetchData
 * is called from the search function.
 */
function fetchData(apiUrl, searchCity = false) {
  fetch(apiUrl)
    // the fetch() method instructs the web browsers to send a request to a URL.
    // Response format from Open Weather api is Json by default.
    // free Open weather plan has less than60 calls/min
    .then((response) => {
      // this code reports that city not found
      // because of the response.status 404 (error code),
      // throw make it skips directly to the catch statement and the error handling.
      // rejects the promise. All this to avoid that it breakes and report: "not finding temp in data.main."
      if (response.status == 404) {
        // gives the error a message
        throw new Error("City not found");
      }
      return response.json();
    })
    // data --> Promise object represents the eventual completion (or failure)
    // of an asynchronous operation and its resulting value.
    .then((data) => {
      console.log(data);
      // when the object has key, value pairs, like data.main
      // properties can be store: const {property} = object
      // for easy access, long form: data.main.property, this is call destructuring.
      const { temp, feels_like, humidity } = data.main;
      temperature.innerHTML = `${temp.toFixed(1)}°C`;
      feelTemperature.innerHTML = ` ${feels_like}°C`;
      humidityElement.innerHTML = ` ${humidity} %`;

      const { sunrise, sunset, country } = data.sys;
      const offsetTime = data.timezone;

      sunriseTime.innerHTML = timeConversion(sunrise, offsetTime);
      sunsetTime.innerHTML = timeConversion(sunset, offsetTime);
      skyColor(sunrise, sunset, offsetTime);
      if (searchCity) {
        searchLocationTimeElement.innerHTML = timeConversion(
          currentDateUserLocation,
          offsetTime
        );
      }
      countryElement.innerHTML = countryCodeConversion(country);
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
      console.log(error);
      alertError(error);
    });
}
