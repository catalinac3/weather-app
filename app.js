// The date and time is display to check connectivity with the html file.
var dateToday = new Date();
var date = `${dateToday.getDate()}/${(dateToday.getMonth()+1)}/${dateToday.getFullYear()}`;

// en-US: uses 12-hour time with AM/PM
var time = dateToday.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

document.getElementById("date-display").innerHTML = `The date today is ${date} and the time ${time}`;

// HTML Geolocation API on your browser - no web request!
// gettting location of the user's computer: latitude and longitude
function getLocation(pos) {
    let lat = pos.coords.latitude.toFixed(2);
    let long = pos.coords.longitude.toFixed(2);
    document.getElementById("location").innerHTML = 
            `Your location is lat: ${lat}° and long: ${long}°`;
    getTemp(lat,long);
}

function handleError(error) {
    document.getElementById("location").innerHTML = 
            `Your position could not be found, error: ${error.message}`;
    console.warn(`Error displaying position, error: ${error.code}`)
}

navigator.geolocation.getCurrentPosition(getLocation, handleError);

// Getting the temperature from the Open Weather API using geographical coordinates.
// Response format is Json by default.
// https://openweathermap.org/current --free

const KEY = "3137461397c70af0e13c77fda97afa11"

function getTemp(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`
    //the fetch() method instructs the web browsers to send a request to a URL.
    //less than60 calls/min
    fetch(api)
    .then(response => {
        // handles response
        // console.log(response.statusText); when response.status is 200, it is OK.
        if (response.status != 200){
            console.log("there is a problem with the request")
        }else{
            // data --> Promise object represents the eventual completion (or failure) 
            // of an asynchronous operation and its resulting value.
            let data = response.json().then(data=> {
            console.log(`Request succeed - json: ${data}`)    
            document.getElementById("temperature").innerHTML = `The 
            temperature in your location is ${data.main.temp.toFixed(2)}C°`}) 
        }        
    })
    .catch(error => {
        // handles errors
        console.warn(`error: ${error.message}, weather API`)  
    });
}

