let uiDate = document.getElementById("date");
let time = document.getElementById("time");
let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let weather = document.getElementById("weather");
let image = document.getElementById("image");

let cityName = document.getElementById("searchbar");

let letterRegex = /^[a-zA-Z0-9_ ]*$/;

async function getData() {
  try {
    if (letterRegex.test(cityName.value)) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=8076315564e46c8c526543e02828cd67`;
      let fetchApi = await fetch(url);

      if (!fetchApi.ok && fetchApi.statusText === "Not Found") {
        Swal.fire("City not found");
      } else {
        let fetchJson = await fetchApi.json();
        showValue(fetchJson);
        console.log(fetchJson);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const date = new Date();
let weekday = date.getDay();
let month = date.getMonth();
let date01 = date.getDate();
let daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthList = [
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
  "December",
];

let hours = date.getHours();
hours = hours < 10 ? "0" + hours : hours;
let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

const formattedTimed = `${hours}:${minutes} `;

let days1 = daysInWeek[weekday];

month = monthList[month];
let monthShort = month.slice(0, 3);
const formattedDate = `${days1}, ${date01} ${monthShort}`;

function showValue(getValue) {
  uiDate.innerText = formattedDate;
  city.innerText = getValue.name;
  time.innerText = formattedTimed;
  temperature.innerText = `${Math.round(getValue.main.temp - 273.15)}\u00B0C`;
  weather.innerText = getValue.weather[0].main;
  if (getValue.weather[0].main === "Haze") {
    image.src = "./assets/windSunny.png";
  } else if (getValue.weather[0].main === "Clouds") {
    image.src = "./assets/cloud.png";
  } else if (getValue.weather[0].main === "Clear") {
    image.src = "./assets/cloudySunny.png";
  } else if (getValue.weather[0].main === "Rain") {
    image.src = "./assets/cloudyRain.png";
  } else if (getValue.weather[0].main === "Fog") {
    image.src = "./assets/haze.png";
  } else if (getValue.weather[0].main === "Mist") {
    image.src = "./assets/haze.png";
  } else {
    image.src = "./assets/sunny.png";
  }
}
