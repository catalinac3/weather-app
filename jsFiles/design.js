// TODO :
// arrange that the house is change back to normal, (when here in munich is dark
// and you want to go to a placer where there is sun, the hause and letters
// in the card are visible)

/**
 * This function changes the color of the background-sky,
 * according to the actual time, sunset and sunrise time.
 * Additionally it changes the letter of the card and the filter of the house
 * according to the color of the sky.
 * @param {number} sunrise - time stamp with time info
 * @param {number} sunset - time stamp with time info
 * @param {number} offsetTime - offset time refering to the time zone
 * @param {boolean} searchCity - default false, true if the user has search for a city
 */
function skyColor(sunrise, sunset, offsetTime, searchCity) {
  // A day has 1440 min: 60*24
  let timeInMinutes;
  if (!searchCity) {
    const hr = currentDateUserLocation.getHours();
    const min = currentDateUserLocation.getMinutes();
    timeInMinutes = hr * 60 + min;
    console.log(hr, min, timeInMinutes);
  } else {
    timeInMinutes = cityTimeToMin(currentDateUserLocation, offsetTime);
  }

  const sunriseInMinutes = timeConversionToMin(sunrise, offsetTime);
  const sunsetInMinutes = timeConversionToMin(sunset, offsetTime);

  const startSunrise = sunriseInMinutes - 120;
  const startSunset = sunsetInMinutes - 60;
  const endSunset = sunsetInMinutes - 60;

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

/**
 * This function converts a time stamp into a number
 * that express the time in minutes
 * @param {number} timeStamp - unix, contains information about the time.
 * @param {number} offsetTime - units of seconds
 */

function timeConversionToMin(timeStamp, offsetTime) {
  const timeObjWithOffset = new Date(timeStamp * 1000 + offsetTime * 1000);
  const timeInMin =
    timeObjWithOffset.getUTCHours() * 60 + timeObjWithOffset.getUTCMinutes();
  return timeInMin;
}

/**
 * this function calculates the time of the searched city
 * to minutes
 * @param {object} dateObj
 * @param {number} offsetTime
 */
function cityTimeToMin(dateObj, offsetTime) {
  // .getTime() returns miliseconds
  const dateObj1 = new Date(dateObj.getTime() + offsetTime * 1000);
  const timeInMin = dateObj1.getUTCHours() * 60 + dateObj1.getUTCMinutes();
  return timeInMin;
}
