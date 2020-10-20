const form = document.querySelector("#city-search-form");
const inputElement = document.querySelector("#city-input");
form.addEventListener("submit", search);
// submit event works by pressing the button or pressing enter after making an input!

function search(event) {
  event.preventDefault();
  //The preventDefault() method cancels the event if it is cancelable, 
  // meaning that the default action that belongs to the event will not occur.
  // submiting a form is cancelled
  //prevent the default action of the form (reloading the page)
  let cityRequested = inputElement.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityRequested}&appid=${KEY}&units=metric`;
  fetchData(api);
}
