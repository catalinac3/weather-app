# Weather-app

- It is a web site that displays the weather at the user's location. 
- Additionally you can search the weather of another city.<br>
- The design is responsive works for mobile and desktop.<br>
- The app uses real weather data from the OpenWeather Api, and animated icons from amCharts.<br><br>

The following information displays in more detail the different resources used on the Weather app.<br><br>


### Weather data:

The data for this web page is collected from the <b>OpenWeather API</b> - Current weather and forecast - free plan. <br>
When the web page is loaded. The data is received in a json file.

| Data                | API Response                | units (API response)        |
| ------------------- | --------------------------- | --------------------------- |
| temperature         | data.main.temp              | ºC                          |
| temp. feels like    | data.main.feels_like        | ºC                          |
| humidity            | data.main.humidity          | %                           |
| time - sunrise      | data.sys.sunrise            | unix, UTC<sup>1</sup>       |
| time - sunset       | data.sys.sunset             | unix, UTC                   |
| time offset         | data.timezone               | shift in seconds from UTC   |
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

### Icons organization on Open Weather API - Animated icons downloaded from <b>amCharts</b>:

| icons      | Description                    | Animated icons (amCharts)   |
| ---------- | ------------------------------ | --------------------------- |
| 11d == 11n | thunderstorm                   | thunder                     |
| 09d == 09n | drizzle, shower rain           | rainy-7                     |
| 10d != 10n | rain                           | rainy-3 (d), rainy-5 (n)    |
| 13d = 13n  | freezing rain, snow            | snowy-3 (d), snowy-5 (n)    |
| 50d == 50n | atmosphere                     | use open weather            |
| 01d != 01n | clear                          | day, night                  |
| 02d != 02n | few clouds                     | cloudy-day-3,cloudy-night-3 |
| 03d == 03n | scatter clouds                 | cloudy-day-3,cloudy-night-3 |
| 04d == 04n | broken clouds, overcast clouds | cloudy-day-3,cloudy-night-3 |

<br>
In icons i.e. 11d, 11n, d=day, n=night.

### Background colors:
10 linear gradients where taken from https://codepen.io/billyysea/pen/whjbK to make the animation of the sky colors on the app.