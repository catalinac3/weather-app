// displayWeatherUserLocation() is used to get the location of the user's computer: latitude and longitude
//(geographical coordinates). These data is used to build the url for Open Weather API,
// where the data of the weather data is fetch from.
function displayWeatherUserLocation(pos) {
  const latitude = pos.coords.latitude.toFixed(2);
  const longitude = pos.coords.longitude.toFixed(2);
  const apiUrl = `${apiRootUrl}weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`;
  fetchData(apiUrl);
}

// function call by submit event from form
// takes the city input, builds api url and call fetch
function search(event) {
  event.preventDefault();
  //The preventDefault() method cancels the event if it is cancelable,
  // meaning that the default action that belongs to the event will not occur.
  // submiting a form is cancelled
  //prevent the default action of the form (reloading the page)
  let cityRequested = inputElement.value;
  //TODO : display correct time cityTime()

  const api = `${apiRootUrl}weather?q=${cityRequested}&appid=${KEY}&units=metric`;
  // true parameter displays the time of the searched city
  fetchData(api, true);
}

// this function calculates the time of the searched city
function cityTime(dateObj, offsetTime) {
  // .getTime() returns miliseconds
  // .getTimezoneOffset() returns the time offset in minutes, *60*1000 to miliseconds
  // offsetTime is collected in seconds
  const dateObj1 = new Date(
    dateObj.getTime() +
      dateObj.getTimezoneOffset() * 60 * 1000 +
      offsetTime * 1000
  );
  return formatTime(dateObj1);
}

// This function converts the sunrise and sunset timestamp and returns
// a displayable time
function timeConversion(timeStamp, offsetTime) {
  // The multiplication *1000 is because the timeStamp and offsetTime are in second
  // and the Date object expects miliseconds.
  let dateObj = new Date(timeStamp * 1000);
  let timeStampWithOffset = timeStamp * 1000 +
  offsetTime * 1000 +
  dateObj.getTimezoneOffset() * 60 * 1000;
  let timeObjWithOffset = new Date(timeStampWithOffset);
  return formatTime(timeObjWithOffset);
}

// displays date and time of the user location
function dateTimeDisplay(dateObj) {
  let date;
  let time;
  date = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;

  time = formatTime(dateObj);
  localDateTimeElement.innerHTML = `Local date: ${date}, local time: ${time}`;
}

// this function format time hh:mm AM/PM
function formatTime(dateObj) {
   // en-US: uses 12-hour time with AM/PM
  return dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
 
}

// handles the alert error messages of fetchData() and geolocation.getCurrentPosition()
function alertError(error) {
  alert(error.message);
}

// This function converts the code of a country to the country name
// if it doesn't exist, it returns the code itself
function countryCodeConversion(countryCode) {
  // bracket notation is needed because countryCode is a variable
  return countryCode in isoCountries ? isoCountries[countryCode] : countryCode;
}

// This function returns an animated icon if available in the iconEquivalence object,
// otherwise it returns a weather map icon
function getIcon(icon) {
  return icon in iconEquivalence
    ? `./img/animated_icons/${iconEquivalence[icon]}.svg`
    : `https://www.openweathermap.org/img/w/${icon}.png`;
}
