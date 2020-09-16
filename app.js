// The date and time is display to check connectivity with the html file.
var dateToday = new Date();
var date = dateToday.getDate() + "/" + (dateToday.getMonth()+1) + "/" + dateToday.getFullYear();
var time = dateToday.getHours() + ":" + dateToday.getMinutes(); 
// TODO -- add cero to minutes less than 10.
document.getElementById("date-display").innerHTML ="The date today is " + date + " and the time " + time ;