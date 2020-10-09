# Weather-app

The progress of the weather can be seen at:  
https://catalinac3.github.io/weather-app/.

### Weather data:

The data for this web page is collected from the OpenWeather API - Current weather and forecast - free plan. <br>
When the web page is loaded. The data is received in a json file.

| Data                | API Response                | units (API response)        |
| ------------------- | --------------------------- | --------------------------- |
| temperature         | data.main.temp              | ºC                          |
| temp. feels like    | data.main.feels_like        | ºC                          |
| humidity            | data.main.humidity          | %                           |
| time - sunrise      | data.sys.sunrise            | unix, UTC<sup>1</sup>       |
| time - sunset       | data.sys.sunset             | unix, UTC                   |
| country name        | data.sys.country            | code                        |
| city name           | data.name                   | string                      |
| precipitation       | data.rain.1h                | mm (last hour) <sup>2</sup> |
| weather description | data.weather[0].description | string                      |
| icon                | data.weather[0].icon        | name png file               |
| Wind speed          | data.wind.speed             | m/s                         |

https://openweathermap.org/ <br><br>
<sup>1</sup> The unix time is the number of seconds that have elapsed since the Unix epoch; the Unix epoch is 00:00:00 UTC on 1 January 1970. https://en.wikipedia.org/wiki/Unix_time <br>
<sup>2</sup> Rain gauges measure the precipitation in millimetres in height collected on an square meter during a period of time. https://en.wikipedia.org/wiki/Rain_gauge <br>

The object isoCountries, with country names and codes was copied from https://gist.github.com/maephisto/9228207

The main weather icon in the app was made by amCharts https://www.amcharts.com/free-animated-svg-weather-icons/, except for the atmosphere icon, that comes from open weather api.
https://openweathermap.org/weather-conditions.

Icons organization on Open Weather API - Animated icons downloaded from amCharts:

| icons      | codes              | Description                    | Animated icons (amCharts)   |
| ---------- | ------------------ | ------------------------------ | --------------------------- |
| 11d == 11n | 200 -232           | thunderstorm                   | thunder                     |
| 09d == 09n | 300-321 && 520-531 | drizzle, shower rain           | rain7                       |
| 10d !=10n  | 500-504            | rain                           | rain3 (day), rain5(night)   |
| 13d = 13n  | 511 & (600-622)    | freezing rain, snow            | snow3 (day), snow5(night)   |
| 50d == 50n | 701-781            | atmosphere                     | use open weather            |
| 01d != 01n | 800                | clear                          | day, night                  |
| 02d != 02n | 801                | few clouds                     | cloudy-day-3,cloudy-night-3 |
| 03d == 03n | 802                | scatter clouds                 | cloudy-day-3,cloudy-night-3 |
| 04d == 04n | 803                | broken clouds, overcast clouds | cloudy-day-3,cloudy-night-3 |

icons id  i.e. 11d, 11n => d=day, n=night.

codes include start number and end number.

drizzle: light rain, almost unperceptible. https://ownyourweather.com/understanding-weather-symbols/
shower rain: shorter duration of rains
