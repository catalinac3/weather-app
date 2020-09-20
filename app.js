// The date and time is display to check connectivity with the html file.
var dateToday = new Date();
var date = `${dateToday.getDate()}/${(dateToday.getMonth()+1)}/${dateToday.getFullYear()}`;

// en-US: uses 12-hour time with AM/PM
var time = dateToday.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
document.getElementById("date-display").innerHTML = `The date today is ${date} and the time ${time}`;

// HTML Geolocation API on your browser - no web request!
// gettting location of the user's computer: latitude and longitude
function printLocation(pos) {
    var lat = pos.coords.latitude.toFixed(2);
    var long = pos.coords.longitude.toFixed(2);
    document.getElementById("location").innerHTML = 
            `Your position is lat: ${lat}° and long: ${long}°`;
}

function handleError(error) {
    document.getElementById("location").innerHTML = 
            `Your position could not be found, error: ${error.message}`;
    console.warn(`Error displaying position, error: ${error.code}`)
}

navigator.geolocation.getCurrentPosition(printLocation, handleError);