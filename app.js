var dateToday = new Date();
var date = dateToday.getDate() + "/" + (dateToday.getMonth()+1) + "/" + dateToday.getFullYear();
var time = dateToday.getHours() + ":" + dateToday.getMinutes(); 

document.getElementById("date-display").innerHTML ="The date today is " + date + " and the time " + time ;