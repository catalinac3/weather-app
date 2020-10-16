const iconEquivalence = {
  "04d": "cloudy-day-3",
  "04n": "cloudy-night-3",
  "03d": "cloudy-day-3",
  "03n": "cloudy-night-3",
  "02d": "cloudy-day-3",
  "02n": "cloudy-night-3",
  "01d": "day",
  "01n": "night",
  "13d": "snowy-3",
  "13n": "snowy-5",
  "10d": "rainy-3",
  "10n": "rainy-5",
  "9d": "rainy-7",
  "9n": "rainy-7",
  "11d": "thunder",
  "11n": "thunder",
};

// This function returns an animated icon if available in the iconEquivalence object,
// otherwise it returns a weather map icon
function getIcon(icon) {
  return icon in iconEquivalence
    ? `./img/animated_icons/${iconEquivalence[icon]}.svg`
    : `https://www.openweathermap.org/img/w/${icon}.png`;
}
