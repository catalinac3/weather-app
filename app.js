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

document.getElementById(
  "date-display"
).innerHTML = `Today's date: ${date}, time: ${time}`;

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
      document.getElementById(
        "temperature"
      ).innerHTML = `${data.main.temp.toFixed(1)}°C`;
    })
    .catch((error) => {
      // handles errors
      console.warn(`error: ${error.message}, weather API`);
    });
}


