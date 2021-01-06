import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
//api returns temp in kelvin
const kelvinFactor = 273.15;
//api returns m/s
const kmPerHr = 3.6;

const Weather = ({ fetchURL }) => {
  const [data, setData] = useState({ country: "", temp_min: "", temp_max: "" });
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [description, setDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    async function search() {
      try {
        const response = await fetch(fetchURL);
        const result = await response.json();

        setData({
          country: result.sys.country,
          temp_min: result.main.temp_min,
          temp_max: result.main.temp_max,
        });
        setTemp(Math.ceil(result.main.temp - kelvinFactor));
        setFeelsLike(Math.ceil(result.main.feels_like - kelvinFactor));
        setWind(result.wind.speed);
        setDescription(result.weather[0].description);
        setHumidity(result.main.humidity);
        setCityName(result.name);
        setWeatherIcon(result.weather[0].icon + ".png");

        let unixSunrise = result.sys.sunrise;
        let unixSunset = result.sys.sunset;
        setSunrise(moment.unix(unixSunrise).format("hh:mm A"));
        setSunset(moment.unix(unixSunset).format("hh:mm A"));
      } catch (error) {
        console.log(error);
      }
    }
    search();
  }, [fetchURL]);

  return (
    <>
      <div className="row m-3">
        <div
          className="col-lg-6 m-1"
          style={{ backgroundColor: "whitesmoke", padding: "20px" }}
        >
          <div className="col-lg-12">
            <h3 className="text-info">
              <span>{cityName}</span>
              <span>,{data.country}</span>
            </h3>
          </div>
          <div className="col-lg-12">
            <h4 style={{ textTransform: "capitalize" }}>{description}</h4>
          </div>
          <div className="col-lg-12">
            <h2 className="text-success">
              <span className="p-1" style={{ borderRadius: "10px" }}>
                <img
                  src={"https://openweathermap.org/img/w/" + weatherIcon}
                  alt="weather-icon"
                />
                {temp}&nbsp;&deg;C
              </span>
            </h2>
          </div>
          <div className="col-lg-12">
            <h6>
              {Math.ceil(data.temp_max - kelvinFactor)}&deg;C /{" "}
              {Math.ceil(data.temp_min - kelvinFactor)}&deg;C
            </h6>
          </div>
          <div className="col-lg-12">
            <h6>Feels Like : {feelsLike}&nbsp;&deg;C</h6>
          </div>
          <div className="col-lg-12">
            <h6>Humidity : {humidity}%</h6>
          </div>
          <div className="col-lg-12">
            <h6>Wind : {Math.round(wind * kmPerHr)} KM/H</h6>
          </div>
          <div className="col-lg-12">
            <h6>Sunrise : {sunrise}</h6>
          </div>
          <div className="col-lg-12">
            <h6>Sunset : {sunset}</h6>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
