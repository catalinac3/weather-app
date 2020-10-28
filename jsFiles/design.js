// TODO :
// Arrange that the house is change back to normal, (when here in munich is dark
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
 */
function skyColor(sunrise, sunset, offsetTime) {
  const timeInMinutes = timeConversion(
    currentDateUserLocation,
    offsetTime,
    true
  );
  const sunriseInMinutes = timeConversion(sunrise, offsetTime, true);
  const sunsetInMinutes = timeConversion(sunset, offsetTime, true);

  const startSunrise = sunriseInMinutes - 30;
  const endSunrise = sunriseInMinutes + 30;
  const aroundSunrise = endSunrise - startSunrise;

  const startSunset = sunsetInMinutes - 30;
  const day = startSunset - endSunrise;
  const endSunset = sunsetInMinutes + 30;

  const aroundSunset = endSunset - startSunset;
  // A day has 1440 min: 60*24

  // console.log("Sunrise: ", sunriseInMinutes);
  // console.log("startSunset: ", startSunset);
  // console.log("day:", day);
  // console.log("startsunset", startSunset);

  // night

  if (
    timeInMinutes < startSunrise ||
    (timeInMinutes > endSunset && timeInMinutes <= 1440)
  ) {
    cardBody.style.color = "#fff";
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.backgroundImage = skyColors[1];
    //console.log("color 1 is on ");
  }

  // end night
  // sunrise
  else if (timeInMinutes < startSunrise + aroundSunrise / 3) {
    cardBody.style.backgroundImage = skyColors[5];
    cardBody.style.color = "#fff";
    imageHouse.style.filter = "sepia(0.6)";
    console.log("color 5 is on ");
  } else if (timeInMinutes < startSunrise + (aroundSunrise / 3) * 2) {
    cardBody.style.backgroundImage = skyColors[7];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    console.log("color 7 is on ");
  } else if (timeInMinutes < startSunrise + aroundSunrise) {
    cardBody.style.backgroundImage = skyColors[9];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    console.log("color 9 is on ");
  }
  // end sunrise
  // day
  else if (timeInMinutes < sunriseInMinutes + day / 3) {
    cardBody.style.backgroundImage = skyColors[10];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    cardFooter.style.backgroundColor = "#FFF";
    cardHeader.style.backgroundColor = "#FFF";
    console.log("color 10 is on ");
  } else if (timeInMinutes < sunriseInMinutes + (day / 3) * 2) {
    cardBody.style.backgroundImage = skyColors[11];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    cardFooter.style.backgroundColor = "#FFF";
    cardHeader.style.backgroundColor = "#FFF";
    console.log("color 11 is on ");
  } else if (timeInMinutes < startSunset) {
    cardBody.style.backgroundImage = skyColors[12];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    cardFooter.style.backgroundColor = "#FFF";
    cardHeader.style.backgroundColor = "#FFF";
    console.log("color 12 is on ");
    // end day
    // sunset
  } else if (timeInMinutes < startSunset + aroundSunset / 3) {
    cardBody.style.backgroundImage = skyColors[15];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    console.log("color 15 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 3) * 2) {
    cardBody.style.backgroundImage = skyColors[17];
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    console.log("color 17 is on ");
  } else if (timeInMinutes < startSunset + aroundSunset) {
    cardBody.style.backgroundImage = skyColors[22];
    console.log("color 22 is on ");
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
  }
  // end sunset
}
