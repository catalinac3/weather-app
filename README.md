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
| icon id             | data.weather[0].icon        | id                          |
| Wind speed          | data.wind.speed             | m/s                         |

https://openweathermap.org/ <br><br>
<sup>1</sup> The unix time is the number of seconds that have elapsed since the Unix epoch; the Unix epoch is 00:00:00 UTC on 1 January 1970. https://en.wikipedia.org/wiki/Unix_time <br>
<sup>2</sup> Rain gauges measure the precipitation in millimetres in height collected on an square meter during a period of time. https://en.wikipedia.org/wiki/Rain_gauge <br>

The object isoCountries, with country names and codes was copied from https://gist.github.com/maephisto/9228207
