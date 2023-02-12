// URL:  https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// resource: https://openweathermap.org/forecast5
// resource: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

// geocoding API:  http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9606aff55a0bd3e2295b059c842b1f5d


// var APIKey = "9606aff55a0bd3e2295b059c842b1f5d";
// var searchInput = document.getElementById("cityName");
// var searchBtn = document.getElementById("searchBtn");
    
    
var currentWeather = {};
var weatherForecast ={};
var APIKey = "9606aff55a0bd3e2295b059c842b1f5d";
  
  currentWeather.fetchWeather = function(city) {
    // var APIKey = "9606aff55a0bd3e2295b059c842b1f5d";

   var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
   fetch(currentWeatherURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;

        currentWeather.displayWeather(data);
        weatherForecast.fetchWeatherForecast(city, cityLat, cityLon);
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
    document.querySelector(".city").innerText = "Current Weather in " + name;
    document.querySelector(".date").innerText = dt;
    document.querySelector(".icon").src =
      " http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = "Temperature: " + temp + "F";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?' + name + '')";
  };


  currentWeather.search = function() {
    currentWeather.fetchWeather(document.querySelector(".search-bar").value);
  };


  weatherForecast.fetchWeatherForecast = function(cityLon, cityLat) {
    // var APIKey = "9606aff55a0bd3e2295b059c842b1f5d";

    var weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?${cityLat}&lon=${cityLon}&units=imperial&appid=" + APIKey;
    
    fetch(weatherForecastURL)
    .then(function(weatherForecastURLresponse) {
      return weatherForecastURLresponse.json();
    })
    .then(function(weatherForecast) {
        console.log(weatherForecast);
        weatherForecast.displayWeatherForecast(data);
    });
  },
  
  weatherForecast.displayWeatherForecast = function(data) {
    var forecast = data.list;
    for (var i = 0; i < forecast.length; i += 8) {
      var date = new Date(forecast[i].dt * 1000);
      var icon = forecast[i].weather[0].icon;
      var description = forecast[i].weather[0].description;
      var temp = forecast[i].main.temp;
      var speed = forecast[i].wind.speed;
      var humidity = forecast[i].main.humidity;
      console.log(date, icon, description, temp, humidity);
      // insert the data into the DOM
      document.querySelector(".date").innerText = date;
      document.querySelector(".icon").src =
        " http://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = "Temperature: " + temp + "F";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".speed").innerText = "Wind Speed: " + speed + "mph";
    }
  },
  
  
    weatherForecast.search = function() {
        weatherForecast.fetchWeatherForecast(document.querySelector(".search-bar").value);
  };

  
  document.querySelector(".searchBtn").addEventListener("click", function() {
    currentWeather.search();
    weatherForecast.search();
  });







// GIVEN a weather dashboard with form inputs

// Steep 1:
//! WHEN I search for a city
//! THEN I am presented with current and future conditions for that city and that city is added to the search history
// 1. Add event listener to the Search button
// 2. grabing the input from the Search field




// step 2A:
//! WHEN I view current weather conditions for that city
//! THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// 1. fetch reuqets to geocode API
// 2. inside the geocode request (inside the .then add the secon request to the weather map API) 
//TODO: need to fetch the information from the API, and display in the (1) console log and then (2) on the screen


// step 2B:
//! WHEN I view future weather conditions for that city
//! THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidit
//TODO: need to write a function (for loop) to dyncamically create elements based and append them to the page to dsplay the information received from the API
//TODO: need to store the infomation in the local storage for the searched city and display the city name in the Search history


// step 3:
//! WHEN I click on a city in the search history
//! THEN I am again presented with current and future conditions for that city
//TODO:
//TODO: