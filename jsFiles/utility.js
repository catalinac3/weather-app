/**
 * displayWeatherUserLocation() is used to get the location of the user's computer: latitude and longitude
 * (geographical coordinates). These data is used to build the url for Open Weather API,
 * where the data of the weather data is fetch from.
 *
 * @param {object} pos - contains user position coordinates
 */
function displayWeatherUserLocation(pos) {
  const latitude = pos.coords.latitude.toFixed(2);
  const longitude = pos.coords.longitude.toFixed(2);
  const apiUrl = `${apiRootUrl}weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`;
  fetchData(apiUrl);
}

/**
 * function call by submit event from form
 * takes the city input, builds api url and call fetch
 *
 * @param {object} event - submit event
 */
function search(event) {
  event.preventDefault();
  //The preventDefault() method cancels the event if it is cancelable,
  // meaning that the default action that belongs to the event will not occur.
  // submiting a form is cancelled
  //prevent the default action of the form (reloading the page)
  const cityRequested = inputElement.value;
  const api = `${apiRootUrl}weather?q=${cityRequested}&appid=${KEY}&units=metric`;
  // true parameter displays the time of the searched city
  fetchData(api, true);
}

/**
 * displays date and time
 *
 * @param {object} dateObj - contains date and time information
 */
function dateTimeDisplay(dateObj) {
  const date = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;

  time = formatTime(dateObj);
  localDateTimeElement.innerHTML = `Local date: ${date}, local time: ${time}`;
}

/**
 * this function calculates the time of the searched city
 *  and returns a displayable time
 *
 * @param {object} dateObj - contains date and time information
 * @param {number} offsetTime - units of seconds
 */
function cityTime(dateObj, offsetTime) {
  // .getTime() returns miliseconds
  const dateObj1 = new Date(dateObj.getTime() + offsetTime * 1000);
  return `Time: ${formatTime(dateObj1, "UTC")}`;
}

/**
 * This function converts the sunrise and sunset timestamp and returns
 * a displayable time
 *
 * @param {number} timeStamp - unix, contains information about the time.
 */
function timeConversion(timeStamp, offsetTime) {
  // The multiplication *1000 is because the timeStamp and offsetTime are in second
  // and the Date object expects miliseconds.
  const timeStampWithOffset = timeStamp * 1000 + offsetTime * 1000;
  const timeObjWithOffset = new Date(timeStampWithOffset);
  return formatTime(timeObjWithOffset, "UTC");
}

/**
 * this function format time --> hh:mm AM/PM
 *
 * @param {object} dateObj - contains date and time information
 * @param {string} timeZone - "UTC" or undefined as default for local time
 */
//
function formatTime(dateObj, timeZone = undefined) {
  // en-US: uses 12-hour time with AM/PM
  // timeZone: timeZone  == timeZone --> just because I used the same name
  return dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
}

/**
 * handles the alert error messages of fetchData() and geolocation.getCurrentPosition()
 *
 * @param {object} error - contains information about the error
 */
function alertError(error) {
  alert(error.message);
}

/**
 * This function converts the code of a country to the country name
 * if it doesn't exist, it returns the code itself
 *
 * @param {string} countryCode - i.e. "DE"
 */
function countryCodeConversion(countryCode) {
  // bracket notation is needed because countryCode is a variable
  return countryCode in isoCountries ? isoCountries[countryCode] : countryCode;
}

/**
 * This function returns an animated icon if available in the iconEquivalence object,
 * otherwise it returns a weather map icon
 *
 * @param {string} icon - i.e. "02"
 */
function getIcon(icon) {
  return icon in iconEquivalence
    ? `./img/animated_icons/${iconEquivalence[icon]}.svg`
    : `https://www.openweathermap.org/img/w/${icon}.png`;
}
