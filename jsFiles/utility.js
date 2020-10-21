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
  fetchData(api);
}


// displays date and time
// TODO: fix for when displaying the time of a searched city -- timezones offset
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
  dateTimeElement.innerHTML = `Today's date: ${date}, time: ${time}`;
}

// handles the alert error messages of fetchData() and geolocation.getCurrentPosition()
function alertError(error) {
  alert(error.message);
}

// This function converts the sunrise and sunset timestamp and returns
// a displayable time
// TODO: fix for when displaying the time of a searched city -- timezones offset
function timeConversion(timeStamp) {
  // The multiplication *1000 is because the timeStamp is in second
  // and the Date expects miliseconds
  let timeObj = new Date(timeStamp * 1000);
  return timeObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
