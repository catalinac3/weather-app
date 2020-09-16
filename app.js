// The date and time is display to check connectivity with the html file.
var dateToday = new Date();
var date = `${dateToday.getDate()}/${(dateToday.getMonth()+1)}/${dateToday.getFullYear()}`;

// en-US: uses 12-hour time with AM/PM
var time = dateToday.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
document.getElementById("date-display").innerHTML = `The date today is ${date} and the time ${time}`;