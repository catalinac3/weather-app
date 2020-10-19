//sky colors from https://codepen.io/billyysea/pen/whjbK
const skyColors = {
  0: "#00000c",
  1: "linear-gradient(to bottom, #020111 85%,#191621 100%)",
  2: "linear-gradient(to bottom, #020111 60%,#20202c 100%)",
  3: "linear-gradient(to bottom, #020111 10%,#3a3a52 100%)",
  4: "linear-gradient(to bottom, #20202c 0%,#515175 100%)",
  5: "linear-gradient(to bottom, #40405c 0%,#6f71aa 80%,#8a76ab 100%)",
  6: "linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%)",
  7: "linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)",
  8: "linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)",
  9: "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)",
  10: "linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)",
  11: "linear-gradient(to bottom, #9be2fe 0%,#67d1fb 100%)",
  12: "linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)",
  13: "linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)",
  14: "linear-gradient(to bottom, #2d91c2 0%,#1e528e 100%)",
  15: "linear-gradient(to bottom, #2473ab 0%,#1e528e 70%,#5b7983 100%)",
  16: "linear-gradient(to bottom, #1e528e 0%,#265889 50%,#9da671 100%)",
  17: "linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)",
  18: "linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%)",
  19: "linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)",
  20: "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%)",
  21: "linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%)",
  22: "linear-gradient(to bottom, #090401 50%,#4B1D06 100%)",
  23: "linear-gradient(to bottom, #00000c 80%,#150800 100%)",
};

let cardBody = document.querySelector(".card-body");
let house = "url(img/house.png)";

// this function should change the color of the sky according to
// the actual time, sunset and sunrise time.
// this function is called from function fetchData() in app.js
function skyColor(sunrise, sunset) {
  // a day has 1440 min: 60*24
  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let timeInMinutes = hr * 60 + min;
  let sunriseInMinutes = timeConversion2(sunrise);
  let sunsetInMinutes = timeConversion2(sunset);

  if (timeInMinutes < sunriseInMinutes - 60) {
    console.log("it is night");
  }
  // night: 22, 23, 0, 1, 2
  // around sunrise: 3, 4, 5, 6, 7 - sunrise, 8
  // day: 9, 10, 11, 12, 13
  // around sunset: 14, 15, 16, 17 - sunset , 18, 19 20, 21
  console.log(timeInMinutes, sunriseInMinutes, sunsetInMinutes);

  cardBody.style.backgroundImage =
    `${house}, linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)`;
}

//This function converts a time stamp into and array that contains the hr and min.
function timeConversion2(timeStamp) {
  let timeObj = new Date(timeStamp * 1000);
  let timeInMin = timeObj.getHours() * 60 + timeObj.getMinutes();
  return timeInMin;
}
