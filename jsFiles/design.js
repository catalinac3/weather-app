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

/**
 * This function changes the diamensions of the progress bar according
 * to the sunrise and sunset time, dividing it into three differently
 * sized parts. It changes the filling of the bar, according to the current time,
 * and it controls the display on the day light label above the bar
 * @param {number} sunrise - time stamp with time info
 * @param {number} sunset - time stamp with time info
 * @param {number} offsetTime - offset time refering to the time zone
 */
function dayProgressBar(sunrise, sunset, offsetTime) {
  // A day has 1440 min: 60*24
  const timeInMinutes = timeConversion(
    currentDateUserLocation,
    offsetTime,
    true
  );

  const sunriseInMinute = timeConversion(sunrise, offsetTime, true);
  const sunsetInMinutes = timeConversion(sunset, offsetTime, true);
  const timeInMinDay = sunsetInMinutes - sunriseInMinute;

  const timeInMinAfterSunset = 60*24 - sunsetInMinutes;

  const barNightMorning = document.querySelector("#bar-night-morning");
  const barNightEvening = document.querySelector("#bar-night-evening");
  const barDayLight = document.querySelector("#bar-day-light");

  // This codes displays the day-light-label.
  if (timeInMinDay % 60 != 0) {
    document.querySelector("#day-light-label").innerHTML = `${Math.floor(
      timeInMinDay / 60
    )}h, ${timeInMinDay % 60}min`;
  } else {
    document.querySelector("#day-light-label").innerHTML = `${Math.floor(
      timeInMinDay / 60
    )}h`;
  }

  // This code adjust the diamensions of the progress bar
  // according to times available (sunrise and sunset)
  document.querySelector("#night-morning").style.width = `${
    (sunriseInMinute / 1440) * 100
  }%`;
  document.querySelector("#day-light").style.width = `${
    (timeInMinDay / 1440) * 100
  }%`;
  document.querySelector("#night-evening").style.width = `${
    (timeInMinAfterSunset / 1440) * 100
  }%`;

  //This code adjust the filling bar according to the current time.
  if (timeInMinutes < sunriseInMinute) {
    // the progress of the day lays in the first bar
    barNightMorning.style.width = `${(
      (timeInMinutes / sunriseInMinute) *
      100
    ).toFixed(1)}%`;
    barNightEvening.style.width = "0%";
    barDayLight.style.width = "0%";
  } else if (timeInMinutes <= sunsetInMinutes) {
    barDayLight.style.width = `${(
      ((timeInMinutes - sunriseInMinute) / timeInMinDay) *
      100
    ).toFixed(1)}%`;
    barNightMorning.style.width = "100%";
    barNightEvening.style.width = "0%";
  } else {
    barNightMorning.style.width = "100%";
    barDayLight.style.width = "100%";
    barNightEvening.style.width = `${(
      ((timeInMinutes - sunsetInMinutes) / timeInMinAfterSunset) *
      100
    ).toFixed(1)}%`;
  }
}
