import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const api = {
  key: "83be13f418ef4eb37391d8f24362b55c",
  base: "http://api.openweathermap.org/data/2.5/",
};
const App = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [city, setCity] = useState("Calgary");
  const [tLocation, setTLocation] = useState("");

  useEffect(() => {
    async function userLocation() {
      try {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        });
      } catch (error) {
        console.log(error);
      }
    }
    userLocation();
  }, []);
  let completeURL;
  if (lat > 0) {
    completeURL = `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`;
  } else {
    completeURL = `${api.base}weather?q=${city}&appid=${api.key}`;
  }

  const handleChange = (loc) => {
    setTLocation(loc);
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setCity(tLocation);
      setLat(0);
      document.getElementById("city").value = "";
    }
  };

  return (
    <div className="App">
      <h1 className="text-success m-3">Weather App</h1>
      <div className="row m-2">
        <div className="col-lg-5 mb-2">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            autoComplete="off"
            className="form-control"
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={handleSubmit}
          />
        </div>
        <div className="col-lg-r ml-3">
          <button
            className="btn btn-success"
            type="submit"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
      <Weather fetchURL={completeURL} />
    </div>
  );
};
export default App;
