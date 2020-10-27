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

  const startSunrise = sunriseInMinutes - 120;
  const aroundSunrise = sunriseInMinutes - startSunrise;
  const startSunset = sunsetInMinutes - 60;
  const day = startSunset - sunriseInMinutes;
  const endSunset = sunsetInMinutes - 60;
  const aroundSunset = endSunset - startSunset;
  // A day has 1440 min: 60*24
  const night = 1440 - endSunset;

  // console.log("Sunrise: ", sunriseInMinutes);
  // console.log("startSunset: ", startSunset);
  // console.log("day:", day);
  // console.log("startsunset", startSunset);

  // night

  if (timeInMinutes < startSunrise) {
    cardBody.style.color = "#fff";
    imageHouse.style.filter = "invert(0.9)";
    if (timeInMinutes < startSunrise / 3) {
      cardBody.style.backgroundImage = skyColors[0];
      console.log("color 0 is on ");
    } else if (timeInMinutes < (startSunrise / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[1];
      console.log("color 1 is on ");
    } else if (timeInMinutes < startSunrise) {
      cardBody.style.backgroundImage = skyColors[2];
      console.log("color 2 is on ");
    }
  }

  // end night
  // sunrise
  else if (timeInMinutes < startSunrise + (aroundSunrise / 7) * 4) {
    cardBody.style.color = "#fff";
    if (timeInMinutes < startSunrise + aroundSunrise / 7) {
      cardBody.style.backgroundImage = skyColors[3];
      imageHouse.style.filter = "invert(0.8)";
      console.log("color 3 is on ");
    } else if (timeInMinutes < startSunrise + (aroundSunrise / 7) * 2) {
      cardBody.style.backgroundImage = skyColors[4];
      imageHouse.style.filter = "invert(0.7)";
      console.log("color 4 is on ");
    } else if (timeInMinutes < startSunrise + (aroundSunrise / 7) * 3) {
      cardBody.style.backgroundImage = skyColors[5];
      imageHouse.style.filter = "sepia(0.6)";
      console.log("color 5 is on ");
    } else if (timeInMinutes < startSunrise + (aroundSunrise / 7) * 4) {
      cardBody.style.backgroundImage = skyColors[6];
      cardBody.style.color = "#fff";
      imageHouse.style.filter = "sepia(0.6)";
      console.log("color 6 is on ");
    }
  } 
  else if (timeInMinutes < startSunset) {
    cardBody.style.color = "black";
    imageHouse.style.filter = "none";
    if (timeInMinutes < startSunrise + (aroundSunrise / 7) * 5) {
      cardBody.style.backgroundImage = skyColors[7];
      console.log("color 7 is on ");
    } else if (timeInMinutes < sunriseInMinutes + (aroundSunrise / 7) * 6) {
      cardBody.style.backgroundImage = skyColors[8];
      console.log("color 8 is on ");
    } else if (timeInMinutes < sunriseInMinutes) {
      cardBody.style.backgroundImage = skyColors[9];
      console.log("color 9 is on ");
    }
    // end sunrise
    // day
    else if (timeInMinutes < sunriseInMinutes + day / 3) {
      cardBody.style.backgroundImage = skyColors[10];
      console.log("color 10 is on ");
      cardFooter.style.backgroundColor = "#FFF";
      cardHeader.style.backgroundColor = "#FFF";
    } else if (timeInMinutes < sunriseInMinutes + (day / 3) * 2) {
      cardBody.style.backgroundImage = skyColors[11];
      console.log("color 11 is on ");
      cardFooter.style.backgroundColor = "#FFF";
      cardHeader.style.backgroundColor = "#FFF";
    } else if (timeInMinutes < startSunset) {
      cardFooter.style.backgroundColor = "#FFF";
      cardHeader.style.backgroundColor = "#FFF";
      cardBody.style.backgroundImage = skyColors[12];
      cardBody.style.color = "black";
      imageHouse.style.filter = "none";
      console.log("color 12 is on ");
      // end day
      // sunset
    }
  } 
  
  else if (timeInMinutes < startSunset + aroundSunset / 9) {
    cardBody.style.backgroundImage = skyColors[13];
    console.log("color 13 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 2) {
    cardBody.style.backgroundImage = skyColors[14];
    console.log("color 14 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 3) {
    cardBody.style.backgroundImage = skyColors[15];
    console.log("color 15 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 4) {
    cardBody.style.backgroundImage = skyColors[16];
    console.log("color 16 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 5) {
    cardBody.style.backgroundImage = skyColors[17];
    console.log("color 17 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 6) {
    cardBody.style.backgroundImage = skyColors[18];
    console.log("color 18 is on ");
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 7) {
    cardBody.style.backgroundImage = skyColors[19];
    console.log("color 19 is on ");
    imageHouse.style.filter = "grayscale(0.4)";
  } else if (timeInMinutes < startSunset + (aroundSunset / 9) * 8) {
    cardBody.style.backgroundImage = skyColors[20];
    console.log("color 20 is on ");
    imageHouse.style.filter = "invert(0.7)";
    cardBody.style.color = "#f7f7f7";
  } else if (timeInMinutes < endSunset) {
    console.log("color 21 is on ");
    cardBody.style.backgroundImage = skyColors[21];
    imageHouse.style.filter = "invert(0.8)";
    cardBody.style.color = "#f7f7f7";
    // end sunset
    // night
  } else if (timeInMinutes < endSunset + night / 2) {
    cardBody.style.backgroundImage = skyColors[22];
    console.log("color 22 is on ");
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
  } else if (timeInMinutes < 1440) {
    cardBody.style.backgroundImage = skyColors[23];
    console.log("color 23 is on ");
    imageHouse.style.filter = "invert(0.9)";
    cardBody.style.color = "#fff";
    cardFooter.style.backgroundColor = "#FFF";
    cardHeader.style.backgroundColor = "#FFF";
  }
}
