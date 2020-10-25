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
 * @param {object} date - contains date and time information
 */
function dateTimeDisplay(date) {
  const dateToday = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const time = formatTime(date);
  localDateTimeElement.innerHTML = `Local date: ${dateToday}, local time: ${time}`;
}

/**
 * This function converts timestamp or a
 * date object and returns a displayable time
 * Currently use for the sunrise and sunset time stamps
 * and to display the time of the searched city
 *
 * @param {number or object} dateInfo - unix, contains information about the time.
 */
function timeConversion(dateInfo, offsetTime) {
  let time;
  if (typeof dateInfo == "number") {
    time = dateInfo * 1000;
  } else {
    time = dateInfo.getTime();
  }
  // The multiplication *1000 is because the timeStamp and offsetTime are in second
  // and the Date object expects miliseconds.
  const timeObjWithOffset = new Date(time + offsetTime * 1000);
  return formatTime(timeObjWithOffset, "UTC");
}

/**
 * this function format time --> hh:mm AM/PM
 *
 * @param {object} date - contains date and time information
 * @param {string} timeZone - "UTC" or undefined as default for local time
 */
//
function formatTime(date, timeZone = undefined) {
  // en-US: uses 12-hour time with AM/PM
  // timeZone: timeZone  == timeZone --> just because I used the same name
  return date.toLocaleTimeString("en-US", {
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
