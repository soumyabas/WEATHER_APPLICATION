
import './App.css';

function App() {

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
                      className="col-3 weather-temperature"
                      id="chooseUnits"
                    >
                      <span href="#" id="celsius" className="celsius-temp">°C</span> /
                      <button href="#" id="farenheit" className="farenheit-temp">°F</button>
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
