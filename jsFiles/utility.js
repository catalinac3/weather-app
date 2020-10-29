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
 * This function converts timestamp or a date object,
 * adds the offset time and returns a time in minutes or
 * a displayable time --> hh:mm AM/PM
 * Currently use for the sunrise and sunset time stamps
 * and to display the time of the searched city
 *
 * @param {number or object} dateInfo - unix, contains information about the time.
 * @param {number} offsetTime - is the seconds a certain time zone is ahead of or behind UTC.
 * @param {boolean} minutesFormat - false default, true when the time is needed in minutes
 */

function timeConversion(dateInfo, offsetTime, inMinutes = false) {
  const dateMilliseconds =
    typeof dateInfo == "number" ? dateInfo * 1000 : dateInfo.getTime();
  // When dateInfo is a number, dateInfo is a timestamp, multiplication *1000 is because
  // the timeStamp and offsetTime are in second and the Date object expects miliseconds.
  const dateWithOffset = new Date(dateMilliseconds + offsetTime * 1000);
  if (inMinutes) {
    return dateWithOffset.getUTCHours() * 60 + dateWithOffset.getUTCMinutes();
  }
  return formatTime(dateWithOffset, "UTC");
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
 * handles the alert error of geolocation.getCurrentPosition()
 * @param {
 * } error
 */
function handleErrorGeo(error) {
  if (error.code == 1) {
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    const api = `${apiRootUrl}weather?q=${randomCity}&appid=${KEY}&units=metric`;
    fetchData(api);
  }
}

/**
 * handles the alert error messages of fetchData()
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
