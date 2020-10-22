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
  let hr = dateObj1.getHours();
  let min = dateObj1.getMinutes();
  return `time:  ${formatTime(hr, min)}`;
}

// displays date and time of the user location
function dateTimeDisplay(dateObj) {
  let date;
  let time;
  date = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;

  // en-US: uses 12-hour time with AM/PM
  time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  localDateTimeElement.innerHTML = `Local date: ${date}, local time: ${time}`;
}

// This function converts the sunrise and sunset timestamp and returns
// a displayable time
function timeConversion(timeStamp, offsetTime) {
  // The multiplication *1000 is because the timeStamp and offsetTime are in second
  // and the Date object expects miliseconds.
  let timeStampWithOffset = timeStamp * 1000 + offsetTime * 1000;
  let timeObjWithOffset = new Date(timeStampWithOffset);
  // now that the offsetTime is manually adding, getting UTC hours and UTC minutes
  // refers to the actual time at the selected location
  let hr = timeObjWithOffset.getUTCHours();
  let min = timeObjWithOffset.getUTCMinutes();
  // here we get the hr and min to a format of hr:min AM/PM
  return formatTime(hr, min);
}

// this function arrange the format of the time displayed to hh:mm
function formatTime(hr, min) {
  let p;
  if (hr > 12) {
    hr -= 12;
    p = "PM";
  } else {
    p = "AM";
  }
  // here we make sure hr and min are displayed with 2 digits
  let hrDisplay;
  hrDisplay = hr.toString().length != 2 ? `0${hr}` : hr;
  let minDisplay;
  minDisplay = min.toString().length != 2 ? `0${min}` : min;
  return `${hrDisplay}:${minDisplay} ${p}`;
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
