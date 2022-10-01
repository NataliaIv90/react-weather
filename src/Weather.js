import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [forecast, setForecast] = useState("");
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState("");
  let [humidity, setHymidity] = useState("");
  let [windSpeed, setWindSpeed] = useState("");
  let [icon, setIcon] = useState("");
  const apiKey = "aaf70afa131000ddc65b8f5fa5abad8d";
  let urlLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function changeCity(event) {
    setCity(event.target.value);
  }

  function showForecast(responce) {
    setTemperature(Math.round(responce.data.main.temp));
    setDescription(responce.data.weather[0].description);
    setHymidity(responce.data.main.humidity);
    setWindSpeed(responce.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
    );
    receiveData();
  }

  function receiveData() {
    if (temperature) {
      setForecast(
        <div className="forecastData">
          <ul>
            <li>Temperature: {temperature}°C</li>
            <li>Description: {description}</li>
            <li>Humidity: {humidity}%</li>
            <li>Wind: {windSpeed}</li>
            <li>
              <img alt="weather icon" src={icon} />
            </li>
          </ul>
        </div>
      );
    }
  }

  function displayForecast(event) {
    event.preventDefault();
    axios.get(urlLink).then(showForecast);
  }

  return (
    <div className="Search">
      <form onSubmit={displayForecast}>
        <input
          type="text"
          placeholder="Enter a city..."
          onChange={changeCity}
        />
        <input type="submit" value="Submit" />
      </form>
      <h2>{forecast}</h2>
    </div>
  );
}
