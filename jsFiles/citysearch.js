const inputElement = document.getElementById("city-input");
document.getElementById("search-weather").addEventListener("click", search);

function search() {
  let cityRequested = inputElement.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityRequested}&appid=${KEY}&units=metric`
  fetchData(api)
}