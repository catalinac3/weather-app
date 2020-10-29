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
    console.log("color 1 is on ");
  }
  // end night
  // sunrise
  else if (timeInMinutes < startSunrise + aroundSunrise / 3) {
    cardBody.style.backgroundImage = skyColors[2];
    cardBody.style.color = "#fff";
    imageHouse.style.filter = "sepia(0.6)";
    console.log("color 2 is on ");
  }
  // section with color: black;  & filer: none
  else if (timeInMinutes < startSunset + (aroundSunset / 3) * 2) {
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    if (timeInMinutes < startSunrise + (aroundSunrise / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[3];
      console.log("color 3 is on ");
    } else if (timeInMinutes < endSunrise) {
      cardBody.style.backgroundImage = skyColors[4];
      console.log("color 4 is on ");
    }
    // end sunrise
    // day
    else if (timeInMinutes < sunriseInMinutes + day / 3) {
      cardBody.style.backgroundImage = skyColors[5];
      console.log("color 5 is on ");
    } else if (timeInMinutes < sunriseInMinutes + (day / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[6];
      console.log("color 6 is on ");
    } else if (timeInMinutes < startSunset) {
      cardBody.style.backgroundImage = skyColors[7];
      console.log("color 7 is on ");
      // end day
      // sunset
    } else if (timeInMinutes < startSunset + aroundSunset / 3) {
      cardBody.style.backgroundImage = skyColors[8];
      console.log("color 8 is on ");
    } else if (timeInMinutes < startSunset + (aroundSunset / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[9];
      console.log("color 9 is on ");
    }
    // end section with color: black;  & filer: none
  } else if (timeInMinutes < endSunset) {
    cardBody.style.backgroundImage = skyColors[10];
    console.log("color 10 is on ");
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
  }
  // end sunset
}
