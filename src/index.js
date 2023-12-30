import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

///////////////////////
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  clink = currentTemp;
  temp.innerHTML = `${currentTemp}°C`;
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  //////////////////
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
////////////////////
function button(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "a655b00e6801b9cd8414703754a066d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function displayTheFlinkTemp(event) {
  event.preventDefault();
  let fTemp = (clink * 9) / 5 + 32;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(fTemp) + "°F";
}

function displayTheClinkTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(clink) + "°C";
}
///// Do not delete ////////////
let clink = null;
/////////////////
let searching = document.querySelector("#submit");
searching.addEventListener("click", button);

let theFlink = document.querySelector("#flink");
theFlink.addEventListener("click", displayTheFlinkTemp);

let theClink = document.querySelector("#clink");
theClink.addEventListener("click", displayTheClinkTemp);

searchCity("Iowa");

///////////////////////////
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return ` ${hours12.toString().padStart(2)}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);
