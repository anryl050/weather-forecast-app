var currentWeather = {};
var weatherForecast = {};
var APIKey = "9606aff55a0bd3e2295b059c842b1f5d";

currentWeather.search = function() {
  var city = document.querySelector(".search-bar").value;
  currentWeather.fetchWeather(city);
};

currentWeather.fetchWeather = function(city) {
  var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  console.log(currentWeatherURL);

  fetch(currentWeatherURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;
      console.log(cityLat, cityLon);

      currentWeather.displayWeather(data);
      weatherForecast.fetchWeatherForecast(cityLat, cityLon);
    })
    .catch(function(error) {
      console.log("Error fetching current weather data:", error);
    });
};

currentWeather.displayWeather = function(data) {
  var name = data.name;
  var dt = data.dt;
  var icon = data.weather[0].icon;
  var description = data.weather[0].description;
  var temp = data.main.temp;
  var humidity = data.main.humidity;
  var speed = data.wind.speed;

  console.log(name, icon, description, temp, humidity, speed);

  document.querySelector(".cityCW").innerText = "Current Weather in " + name;
  document.querySelector(".dateCW").innerText = "Date: " + new Date(dt * 1000).toLocaleDateString();
  document.querySelector(".iconCW").src = "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".descriptionCW").innerText = description;
  document.querySelector(".tempCW").innerText = "Temperature: " + temp + "F";
  document.querySelector(".humidityCW").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".windCW").innerText = "Wind Speed: " + speed + "mph";
  document.querySelector(".hero").style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
};

weatherForecast.search = function() {
  var city = document.querySelector(".search-bar").value;
  weatherForecast.fetchWeatherForecast(city);
};

weatherForecast.fetchWeatherForecast = function(city) {
  var weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
  console.log(weatherForecastURL);

  fetch(weatherForecastURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.list);

      var dataArray = [];

      for (var i = 0; i < data.list.length; i += 8) {
        dataArray.push(data.list[i]);
      }

      weatherForecast.displayForecast(dataArray);
    });
};

weatherForecast.displayForecast = function(dataArray) {
  var nextDaysWeather = `<div class="weather-forecast row d-flex justify-content-start">
                        <h2>5-Day Forecast</h2>`;

  for (var i = 0; i < dataArray.length; i++) {
    var date = new Date(dataArray[i].dt * 1000);

    nextDaysWeather += `<div class="col-2 me-2" id="weather-forecast">
                            <div class="card card-body" style="color: #4B515D; border-radius: 35px;">
                                <p class="date"><strong>Date:</strong> ${date}</p>
                                <p class="temp mb-2"><strong>Temperature:</strong> ${Number(dataArray[i].main.temp).toFixed(1)}F</p>
                                <p class="speed mb-2"><strong>Wind Speed:</strong> ${Number(dataArray[i].wind.speed).toFixed(1)}mph</p>
                                <p class="humidity mb-2"><strong>Humidity:</strong> ${Number(dataArray[i].main.humidity).toFixed(1)}%</p>
                                <img src="http://openweathermap.org/img/wn/${dataArray[i].weather[0].icon}.png" alt="" class="icon" width="100px">
                                <p class="description mb-0 me-2">${dataArray[i].weather[0].description}</p>
                            </div>
                        </div>`;
  }

  nextDaysWeather += `</div>`;

  document.getElementById("weather-forecast").innerHTML = nextDaysWeather;
};

document.querySelector(".searchBtn").addEventListener("click", function() {
  var cityInputEl = document.getElementById("cityName");
  var city = cityInputEl.value.trim();

  if (city) {
    let searchArchive = JSON.parse(localStorage.getItem("cityHistory")) || [];
    if (!searchArchive.includes(city)) {
      searchArchive.push(city);
      localStorage.setItem("cityHistory", JSON.stringify(searchArchive));
      searchArchive();
    }
  }
  currentWeather.search();
  weatherForecast.search();
});

function searchArchive() {
  var previousSearch = "";

  let searchArchive = JSON.parse(localStorage.getItem("cityHistory")) || [];

  for (var i = 0; i < searchArchive.length; i++) {
    const city = searchArchive[i];
    previousSearch += `
        <a type="button" onclick="currentWeather.fetchWeather('${city}')">
            <span class="input-text" >
                ${city}
            </span>
        </a>`;
  }
  document.getElementById("previousHistory").innerHTML = previousSearch;
}

searchArchive();