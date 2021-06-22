
import './App.css';
import axios from "axios";

function App() {
  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wedneday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${formathours(timestamp)}`;
  }

  function formathours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  function search(event) {
    event.preventDefault();

    let currentCity = document.querySelector("#search-city");
    let city = document.querySelector("#cityName");
    city.innerHTML = currentCity.value;
    displayWeather(currentCity.value);
  }

  function showTemp(response) {
    let celsiusTemperature = response.data.main.temp;

    let tempNow = document.querySelector("#degrees");
    tempNow.innerHTML = Math.round(celsiusTemperature);

    let attribute = document.querySelector("#description");
    attribute.innerHTML = response.data.weather[0].description;

    let humidity = document.querySelector("#humidity-element");
    humidity.innerHTML = response.data.main.humidity;

    let speed = document.querySelector("#wind-speed");
    speed.innerHTML = Math.round(response.data.wind.speed);

    let dateNow = document.querySelector("#date");
    dateNow.innerHTML = formatDate(response.data.dt * 1000);

    let weatherIcon = document.querySelector("#iconNow");
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].icon);
  }

  function displayfarenheit(event) {
    event.preventDefault();

    // todo get celcius
    // let farenheitNow = document.querySelector("#degrees");
    // let farenheitTempNow = (celsiusTemperature * 9) / 5 + 32;
    // farenheitNow.innerHTML = Math.round(farenheitTempNow);
  }

  function displaycelsius(event) {
    event.preventDefault();
    //let tempNow = document.querySelector("#degrees");
    // tempNow.innerHTML = Math.round(celsiusTemperature);
  }

  function showForecast(response) {
    let forecastNow = document.querySelector("#forecastSixDays");
    forecastNow.innerHTML = null;
    let forecastedWeather = null;

    for (let index = 0; index < 6; index++) {
      forecastedWeather = response.data.list[index];
      forecastNow.innerHTML += `
  <div className= "col-2">
      <h5>
          ${formathours(forecastedWeather.dt * 1000)}
      </h5>
         </br>
      <div>
        <img  className="img-fluid" src="http://openweathermap.org/img/wn/${forecastedWeather.weather[0].icon}@2x.png"/>
      <div className= "weather-forecast">
          </br>
      <strong>${Math.round(
        forecastedWeather.main.temp_max
      )}°</strong> ${Math.round(forecastedWeather.main.temp_min)}°
      </div >
  </div >
    `;
    }
  }

  function displayWeather(city) {
    let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(showTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showForecast);

  }
  /*function Search() {
    let celsiusTemperature = null;

    let form = document.querySelector("#city-name");
    form.addEventListener("submit", search);

    let farenheitLink = document.querySelector("#farenheit");
    farenheitLink.addEventListener("click", displayfarenheit);

    let celsiusLink = document.querySelector("#celsius");
    celsiusLink.addEventListener("click", displaycelsius);
  }*/

  function showTempNow(response) {
    let cityHereNow = document.querySelector("#cityName");
    cityHereNow.innerHTML = response.data.name;

    displayWeather(cityHereNow.innerHTML);

    let tempHereNow = document.querySelector("#degrees");
    tempHereNow.innerHTML = Math.round(response.data.main.temp);

    let attributeNow = document.querySelector("#description");
    attributeNow.innerHTML = response.data.weather[0].description;

    let humidityNow = document.querySelector("#humidity-element");
    humidityNow.innerHTML = response.data.main.humidity;

    let windHereNow = document.querySelector("#wind-speed");
    windHereNow.innerHTML = Math.round(response.data.wind.speed);

    let dateHereNow = document.querySelector("#date");
    dateHereNow.innerHTML = formatDate(response.data.dt * 1000);
  }


  function showLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
    let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(`${geoApiUrl}`).then(showTempNow);
  }

  /* function getCurrentPosition() {
     navigator.geolocation.getCurrentPosition(showLocation);
   }
   /*
   
     let button = document.querySelector("#gps-Location");
     button.addEventListener("click", getCurrentPosition);
   
     let forecastWeatherDays = document.querySelector("#forecastSixDays");
   
     let weekly = [{
       time: '12:00',
       img: 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
       min: 5,
       max: 7
     },
     {
       time: '15:00',
       img: 'https://ssl.gstatic.com/onebox/weather/64/snow_s_rain.png',
       min: 6,
       max: 7
     },
     {
       time: '12:00',
       img: 'https://ssl.gstatic.com/onebox/weather/64/rain_heavy.png',
       min: 7,
       max: 7
     },
     {
       time: '12:00',
       img: 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
       min: 8,
       max: 10
     },
     {
       time: '12:00',
       img: 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
       min: 10,
       max: 11
     },
     {
       time: '12:00',
       img: 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
       min: 9,
       max: 10
     }]
   
     let html = '';
     for (let index = 0; index < weekly.length; index++) {
       const day = weekly[index];
       html += `<div className= "col-2">
         <h5>
             ${day.time}
         </h5>
            </br>
         <img
         src="  ${day.img}" alt = ""
       />
         <div className= "weather-forecast">
             </br>
         <strong>   ${day.min}°</strong>    ${day.max}°
         </div>
     </div>`
     }
   
     forecastWeatherDays.innerHTML = html;
   */




  return (
    <div className="App">
      <div className="container">
        <div className="weather-app">
          <div className="row">
            <div className="col-6">
              <h1 className="weather">FORECAST</h1>
            </div>
          </div>

          <div className="row pt-3"></div>

          <div className="row">
            <div className="col-7">
              <div className="content-border">
                <div className="mainCard">
                  <h2 id="cityName">Denholme</h2>
                  <h5 id="date">Tuesday 15:00</h5>

                  <div className="row">
                    <div className="className col-md-2">
                      <img
                        id="iconNow"
                        className="icono"
                        src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                        alt="sunny"
                      />
                    </div>

                    <div className="col-4">
                      <h1 className="temp" id="degrees">7</h1>
                    </div>
                    <div
                      className="col-3"
                      id="chooseUnits"
                      className="weather-temperature"
                    >
                      <a href="#" id="celsius" className="celsius-temp">°C</a> /
                      <a href="#" id="farenheit" className="farenheit-temp">°F</a>
                    </div>
                    <div className="col-3">
                      <h7 className="attribute" id="description">
                        Light cloud and sunny</h7
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-5">
              <div>
                <form id="city-name" className="form-inline input-group">
                  <input
                    type="text"
                    placeholder="enter name of the city"
                    autocomplete="off"
                    autofocus="on"
                    id="search-city"
                    className="form-control sm-2"
                  />
                  <input type="submit" className="btn btn-primary" value="Search" />

                  <button className="btn btn-warning sm-2" id="gps-Location">
                    📌
                  </button>
                </form>
                <div className="content-border-ul">
                  <ul>
                    <li>Wind: <span id="wind-speed">2</span> km/hr</li>
                    <li>Humidity: <span id="humidity-element"> 93</span> %</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-3"></div>

          <div className="row">
            <div className="col-8">
              <div className="content-border">
                <div className="row forecastSixDays" id="forecastSixDays"></div>
              </div>
            </div>


            <footer>
              <a href="https://github.com/soumyabas/Forecast-app" className="link"
              >Open source-code</a
              >
              by Soumya Basnet
            </footer>
            <script src="script.js"></script>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
