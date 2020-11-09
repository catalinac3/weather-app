/**
 * This function changes the color of the background-sky,
 * according to the actual time, sunset and sunrise time.
 * Additionally it changes the letter of the card and the filter of the house
 * according to the color of the sky.
 * @param {number} sunrise - time stamp with time info
 * @param {number} sunset - time stamp with time info
 * @param {number} offsetTime - offset time refering to the time zone
 */
function skyColor(sunrise, sunset, offsetTime) {
  const timeInMinutes = timeConversion(
    currentDateUserLocation,
    offsetTime,
    true
  );
  const sunriseInMinutes = timeConversion(sunrise, offsetTime, true);
  const sunsetInMinutes = timeConversion(sunset, offsetTime, true);

  const startSunrise = sunriseInMinutes - 60;
  const endSunrise = sunriseInMinutes + 60;
  const aroundSunrise = endSunrise - startSunrise;

  const startSunset = sunsetInMinutes - 60;
  const day = startSunset - endSunrise;
  const endSunset = sunsetInMinutes + 60;

  const aroundSunset = endSunset - startSunset;
  // A day has 1440 min: 60*24

  // night
  if (
    timeInMinutes < startSunrise ||
    (timeInMinutes > endSunset && timeInMinutes <= 1440)
  ) {
    cardBody.style.color = "#fff";
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.backgroundImage = skyColors[1];
  }
  // end night
  // sunrise
  else if (timeInMinutes < startSunrise + aroundSunrise / 3) {
    cardBody.style.backgroundImage = skyColors[2];
    cardBody.style.color = "#fff";
    imageHouse.style.filter = "sepia(0.6)";
  }
  // section with color: black;  & filer: none
  else if (timeInMinutes < startSunset + (aroundSunset / 3) * 2) {
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    if (timeInMinutes < startSunrise + (aroundSunrise / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[3];
    } else if (timeInMinutes < endSunrise) {
      cardBody.style.backgroundImage = skyColors[4];
    }
    // end sunrise
    // day
    else if (timeInMinutes < sunriseInMinutes + day / 3) {
      cardBody.style.backgroundImage = skyColors[5];
    } else if (timeInMinutes < sunriseInMinutes + (day / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[6];
    } else if (timeInMinutes < startSunset) {
      cardBody.style.backgroundImage = skyColors[7];
      // end day
      // sunset
    } else if (timeInMinutes < startSunset + aroundSunset / 3) {
      cardBody.style.backgroundImage = skyColors[8];
    } else if (timeInMinutes < startSunset + (aroundSunset / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[9];
    }
    // end section with color: black;  & filer: none
  } else if (timeInMinutes < endSunset) {
    cardBody.style.backgroundImage = skyColors[10];
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
  }
  // end sunset
}
