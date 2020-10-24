// TODO
// 1st it has to work of the location of the user !

// arrange that the house is change to normal, when here in munich is dark
// and you want to go to a placer where there is sun, the hause and letters
// in the card are visible

/**
 * this function should change the color of the background-sky
 * according to the actual time, sunset and sunrise time.
 * @param {*} sunrise
 * @param {*} sunset
 */
function skyColor(sunrise, sunset, offsetTime) {
  // a day has 1440 min: 60*24
  let hr = currentDateUserLocation.getHours();
  let min = currentDateUserLocation.getMinutes();
  console.log(hr, min);
  let timeInMinutes = hr * 60 + min;
  let sunriseInMinutes = timeConversion2(sunrise, offsetTime);
  let sunsetInMinutes = timeConversion2(sunset, offsetTime);

  let startSunrise = sunriseInMinutes - 120;
  let startSunset = sunsetInMinutes - 60;
  let endSunset = sunsetInMinutes - 60;
  // night:  0, 1, 2
  // around sunrise: 3, 4, 5, 6, 7 - sunrise, 8
  // day: 9, 10, 11, 12,
  // around sunset:13, 14, 15, 16, 17 - sunset , 18, 19 20, 21
  // night: 22, 23
  if (timeInMinutes < startSunrise / 3) {
    cardBody.style.backgroundImage = skyColors[0];
  } else if (timeInMinutes < (startSunrise / 3) * 2) {
    cardBody.style.backgroundImage = skyColors[1];
  } else if (timeInMinutes < startSunrise) {
    cardBody.style.backgroundImage = skyColors[2];
    // until here is night
  } else if (
    timeInMinutes <
    startSunrise + (sunriseInMinutes - startSunrise) / 6
  ) {
    cardBody.style.backgroundImage = skyColors[3];
  } else if (
    timeInMinutes <
    startSunrise + ((sunriseInMinutes - startSunrise) / 6) * 2
  ) {
    cardBody.style.backgroundImage = skyColors[4];
  } else if (
    timeInMinutes <
    startSunrise + ((sunriseInMinutes - startSunrise) / 6) * 3
  ) {
    cardBody.style.backgroundImage = skyColors[5];
  } else if (
    timeInMinutes <
    startSunrise + ((sunriseInMinutes - startSunrise) / 6) * 4
  ) {
    cardBody.style.backgroundImage = skyColors[6];
  } else if (
    timeInMinutes <
    startSunrise + ((sunriseInMinutes - startSunrise) / 6) * 5
  ) {
    cardBody.style.backgroundImage = skyColors[7];
  } else if (timeInMinutes < sunriseInMinutes) {
    cardBody.style.backgroundImage = skyColors[8];
    // until here is sunrise
  } else if (
    timeInMinutes <
    sunriseInMinutes + (startSunset - sunriseInMinutes) / 4
  ) {
    cardBody.style.backgroundImage = skyColors[9];
  } else if (
    timeInMinutes <
    sunriseInMinutes + ((startSunset - sunriseInMinutes) / 4) * 2
  ) {
    cardBody.style.backgroundImage = skyColors[10];
    cardFooter.style.backgroundColor = "#FFF";
    cardHeader.style.backgroundColor = "#FFF";
  } else if (
    timeInMinutes <
    sunriseInMinutes + ((startSunset - sunriseInMinutes) / 4) * 3
  ) {
    cardBody.style.backgroundImage = skyColors[11];
    cardFooter.style.backgroundColor = "#FFF";
    cardHeader.style.backgroundColor = "#FFF";
  } else if (timeInMinutes < startSunset) {
    cardBody.style.backgroundImage = skyColors[12];
    // until here is day
  } else if (timeInMinutes < startSunset + (endSunset - startSunset) / 9) {
    cardBody.style.backgroundImage = skyColors[13];
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 2
  ) {
    cardBody.style.backgroundImage = skyColors[14];
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 3
  ) {
    cardBody.style.backgroundImage = skyColors[15];
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 4
  ) {
    cardBody.style.backgroundImage = skyColors[16];
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 5
  ) {
    cardBody.style.backgroundImage = skyColors[17];
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 6
  ) {
    cardBody.style.backgroundImage = skyColors[18];
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 7
  ) {
    cardBody.style.backgroundImage = skyColors[19];
    imageHouse.style.filter = "grayscale(0.4)";
  } else if (
    timeInMinutes <
    startSunset + ((endSunset - startSunset) / 9) * 8
  ) {
    cardBody.style.backgroundImage = skyColors[20];
    imageHouse.style.filter = "invert(0.7)";
    cardBody.style.color = "#f7f7f7";
  } else if (timeInMinutes < endSunset) {
    cardBody.style.backgroundImage = skyColors[21];
    imageHouse.style.filter = "invert(0.8)";
    cardBody.style.color = "#f7f7f7";
    // until here is sunset
  } else if (timeInMinutes < endSunset + (1440 - endSunset) / 2) {
    cardBody.style.backgroundImage = skyColors[22];
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
  } else if (timeInMinutes < 1440) {
    cardBody.style.backgroundImage = skyColors[23];
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
  }
}

//This function converts a time stamp into and array that contains the hr and min.
function timeConversion2(timeStamp, offsetTime) {
  let timeObjWithOffset = new Date(timeStamp * 1000 + offsetTime * 1000);
  let timeInMin =
    timeObjWithOffset.getUTCHours() * 60 + timeObjWithOffset.getUTCMinutes();
  return timeInMin;
}
